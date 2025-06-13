'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AddProductPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      category: formData.get('category'),
      brand: formData.get('brand'),
      model: formData.get('model'),
      year: formData.get('year'),
      condition: formData.get('condition'),
      images: formData.getAll('images'),
    };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        router.push('/sellers/products');
      } else {
        const data = await response.json();
        setError(data.message || 'Произошла ошибка при добавлении товара');
      }
    } catch (err) {
      setError('Произошла ошибка при отправке данных');
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Доступ запрещен</h2>
          <p className="text-gray-600 mb-6">Для добавления товаров необходимо войти в систему</p>
          <button
            onClick={() => router.push('/api/auth/signin')}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Добавление запчасти</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Название запчасти
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Цена
            </label>
            <input
              type="number"
              id="price"
              name="price"
              required
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Категория
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Выберите категорию</option>
              <option value="engine">Двигатель</option>
              <option value="transmission">Трансмиссия</option>
              <option value="chassis">Ходовая часть</option>
              <option value="hydraulics">Гидравлика</option>
              <option value="electrical">Электрика</option>
              <option value="body">Кузов и кабина</option>
              <option value="filters">Фильтры и масла</option>
              <option value="attachments">Навесное оборудование</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
              Марка техники
            </label>
            <select
              id="brand"
              name="brand"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Выберите марку</option>
              <option value="caterpillar">Caterpillar</option>
              <option value="komatsu">Komatsu</option>
              <option value="hitachi">Hitachi</option>
              <option value="volvo">Volvo</option>
              <option value="liebherr">Liebherr</option>
              <option value="jcb">JCB</option>
              <option value="doosan">Doosan</option>
              <option value="hyundai">Hyundai</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
              Модель техники
            </label>
            <input
              type="text"
              id="model"
              name="model"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Год выпуска
            </label>
            <input
              type="number"
              id="year"
              name="year"
              min="1950"
              max={new Date().getFullYear()}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
              Состояние
            </label>
            <select
              id="condition"
              name="condition"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Выберите состояние</option>
              <option value="new">Новый</option>
              <option value="used">Б/у</option>
              <option value="rebuilt">Восстановленный</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Изображения
            </label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Добавление...' : 'Добавить запчасть'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 