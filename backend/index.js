const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3001;

// Настройка подключения к базе данных PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'your_username',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'marketplace_db',
  password: process.env.DB_PASSWORD || 'your_password',
  port: process.env.DB_PORT || 5432,
});

// Проверка подключения к базе данных
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Connected to PostgreSQL at:', result.rows[0].now);
  });
});

app.use(express.json());

// Пример простого API-эндпоинта
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
}); 