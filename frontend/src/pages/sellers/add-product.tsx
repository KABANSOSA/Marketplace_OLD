import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    const sellerId = localStorage.getItem('sellerId'); // Получаем ID продавца из localStorage
    if (!sellerId) {
      setMessage('Ошибка: ID продавца не найден. Пожалуйста, войдите снова.');
      router.push('/sellers/login');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/products', {
        name,
        description,
        price: parseFloat(price.toString()), // Преобразуем цену в число с плавающей точкой
        stock: parseInt(stock.toString()),   // Преобразуем количество в целое число
        seller_id: parseInt(sellerId), // Преобразуем sellerId в число
      });

      if (response.status === 201) {
        setMessage('Товар успешно добавлен!');
        setName('');
        setDescription('');
        setPrice(0);
        setStock(0);
        // Опционально: перенаправить на страницу со списком товаров после добавления
        router.push(`/sellers/${sellerId}/products`);
      } else {
        setMessage(response.data.message || 'Ошибка при добавлении товара.');
      }
    } catch (error) {
      console.error('Ошибка сети или сервера:', error);
      setMessage('Произошла ошибка при подключении к серверу. Пожалуйста, попробуйте еще раз.');
    }
  };

  return (
    <div className="container">
      <h1>Добавить новый товар</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Название товара:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Описание:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Цена:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="stock">Количество на складе:</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit">Добавить товар</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProductPage; 