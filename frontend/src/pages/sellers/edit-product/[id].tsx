import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  seller_id: number;
}

const EditProductPage = () => {
  const router = useRouter();
  const { id } = router.query; // Получаем ID товара из URL
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return; // Если ID еще не получен, ничего не делаем

      try {
        const response = await axios.get(`http://localhost:3002/products/${id}`);
        if (response.status === 200) {
          const productData = response.data.product; // В прошлый раз данные были в data.product
          setProduct(productData);
          setName(productData.name);
          setDescription(productData.description);
          setPrice(productData.price);
          setStock(productData.stock);
        } else {
          setMessage(response.data.message || 'Ошибка при загрузке данных товара.');
        }
      } catch (error) {
        console.error('Ошибка сети или сервера:', error);
        setMessage('Произошла ошибка при подключении к серверу или товар не найден.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    if (!product) {
      setMessage('Ошибка: данные товара не загружены.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3001/products/${id}`, {
        name,
        description,
        price: parseFloat(price.toString()),
        stock: parseInt(stock.toString()),
      });

      if (response.status === 200) {
        setMessage('Товар успешно обновлен!');
        // Опционально: перенаправить обратно на страницу со списком товаров
        router.push(`/sellers/${product.seller_id}/products`);
      } else {
        setMessage(response.data.message || 'Ошибка при обновлении товара.');
      }
    } catch (error) {
      console.error('Ошибка сети или сервера:', error);
      setMessage('Произошла ошибка при подключении к серверу. Пожалуйста, попробуйте еще раз.');
    }
  };

  if (loading) {
    return <div>Загрузка товара...</div>;
  }

  if (!product) {
    return <div>Товар не найден.</div>;
  }

  return (
    <div className="container">
      <Head>
        <title>Редактировать товар - Marketplace</title>
      </Head>

      <h1>Редактировать товар: {product.name}</h1>

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
        <button type="submit">Обновить товар</button>
      </form>

      {message && <p>{message}</p>}

      <p><Link href={`/sellers/${product.seller_id}/products`}>Вернуться к списку товаров</Link></p>
    </div>
  );
};

export default EditProductPage; 