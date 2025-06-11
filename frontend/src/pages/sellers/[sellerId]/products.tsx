import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  seller_id: number;
  stock: number;
  created_at: string;
  updated_at: string;
}

const SellerProductsPage = () => {
  const router = useRouter();
  const { sellerId } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!sellerId) return;

      try {
        const response = await axios.get(`http://localhost:3002/products/seller/${sellerId}`);
        if (response.status === 200) {
          setProducts(response.data);
          setMessage('Товары успешно получены!');
        } else {
          setMessage(response.data.message || 'Ошибка при получении товаров.');
        }
      } catch (error) {
        console.error('Ошибка сети или сервера:', error);
        setMessage('Произошла ошибка при подключении к серверу. Пожалуйста, попробуйте еще раз.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sellerId]);

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="container">
      <h1>Товары Продавца {sellerId}</h1>
      {message && <p>{message}</p>}

      {products.length === 0 ? (
        <p>У вас пока нет товаров. <Link href="/sellers/add-product">Добавить новый товар</Link></p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>ID: {product.id}</p>
              <p>Описание: {product.description}</p>
              <p>Цена: {product.price} руб.</p>
              <p>На складе: {product.stock} шт.</p>
              <p>Добавлен: {new Date(product.created_at).toLocaleString()}</p>
              <Link href={`/sellers/edit-product/${product.id}`}>Редактировать</Link>
            </li>
          ))}
        </ul>
      )}
      <p><Link href="/sellers/add-product">Добавить новый товар</Link></p>
      <p><Link href="/">Вернуться на главную</Link></p>
    </div>
  );
};

export default SellerProductsPage; 