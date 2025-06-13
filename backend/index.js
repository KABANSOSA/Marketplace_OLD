require('dotenv').config();
const express = require('express');
const pool = require('./db');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const XLSX = require('xlsx');

const app = express();
const port = process.env.PORT || 3002;
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Пример простого API-эндпоинта
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Маршрут для регистрации продавцов
app.post('/sellers/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO sellers (email, password) VALUES ($1, $2) RETURNING id, email',
      [email, hashedPassword]
    );
    res.status(201).json({ message: 'Seller registered successfully', seller: result.rows[0] });
  } catch (err) {
    console.error(err);
    if (err.code === '23505') { // Unique violation code for PostgreSQL
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Error registering seller' });
  }
});

// Маршрут для входа продавцов
app.post('/sellers/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM sellers WHERE email = $1', [email]);
    const seller = result.rows[0];

    if (!seller) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, seller.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // В реальном приложении здесь будет генерация JWT токена
    res.status(200).json({ message: 'Logged in successfully', sellerId: seller.id, sellerName: seller.name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error logging in' });
  }
});

// Маршрут для добавления нового товара
app.post('/products', async (req, res) => {
  const { name, description, price, stock, seller_id } = req.body;

  // Генерируем простые заглушки для обязательных полей, которые не приходят с фронтенда
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '') + '-' + Date.now();
  const sku = 'SKU-' + Date.now();
  const brand = 'Unknown'; // Заглушка
  const model = 'Unknown'; // Заглушка
  const condition = 'new'; // Заглушка

  try {
    const result = await pool.query(
      'INSERT INTO products (name, slug, description, price, stock, sku, brand, model, condition, seller_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;',
      [name, slug, description, price, stock, sku, brand, model, condition, seller_id]
    );
    res.status(201).json({ message: 'Product added successfully', product: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error adding product' });
  }
});

// Маршрут для получения всех товаров конкретного продавца
app.get('/products/seller/:sellerId', async (req, res) => {
  const { sellerId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE seller_id = $1 ORDER BY created_at DESC', [sellerId]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Маршрут для получения товара по ID
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    const product = result.rows[0];
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching product' });
  }
});

// Маршрут для обновления товара по ID
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, stock = $4, updated_at = NOW() WHERE id = $5 RETURNING *;',
      [name, description, price, stock, id]
    );
    const updatedProduct = result.rows[0];
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating product' });
  }
});

// Маршрут для массовой загрузки товаров
app.post('/products/bulk-upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Файл не был загружен' });
    }

    const sellerId = req.body.sellerId;
    if (!sellerId) {
      return res.status(400).json({ message: 'ID продавца не указан' });
    }

    // Читаем Excel-файл
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    // Проверяем наличие обязательных полей
    const requiredFields = ['name', 'description', 'price', 'category'];
    const missingFields = requiredFields.filter(field => 
      !data[0] || !(field in data[0])
    );

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: `В Excel-файле отсутствуют обязательные поля: ${missingFields.join(', ')}` 
      });
    }

    // Начинаем транзакцию
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Подготавливаем запрос для вставки
      const insertQuery = `
        INSERT INTO products (
          seller_id, name, description, price, category,
          slug, sku, brand, model, condition
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
      `;

      // Вставляем каждый товар
      for (const row of data) {
        const slug = row.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const sku = `SKU-${Math.random().toString(36).substr(2, 9)}`;
        
        await client.query(insertQuery, [
          sellerId,
          row.name,
          row.description,
          row.price,
          row.category,
          slug,
          sku,
          row.brand || null,
          row.model || null,
          row.condition || 'new'
        ]);
      }

      await client.query('COMMIT');
      res.json({ success: true, message: 'Товары успешно загружены' });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error uploading products:', err);
    res.status(500).json({ 
      message: 'Ошибка при загрузке товаров',
      error: err.message 
    });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});