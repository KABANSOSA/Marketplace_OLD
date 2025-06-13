'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';

// Временные данные для демонстрации
const user = {
  name: 'Иван Иванов',
  email: 'ivan@example.com',
  phone: '+7 (999) 123-45-67',
  address: 'г. Москва, ул. Примерная, д. 1',
};

const recentOrders = [
  {
    id: 1,
    date: '2024-02-15',
    status: 'Доставлен',
    total: 85000,
    items: [
      {
        id: 1,
        name: 'Гидроцилиндр Komatsu PC200',
        price: 85000,
        image: 'https://via.placeholder.com/400x300?text=Гидроцилиндр',
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    date: '2024-02-10',
    status: 'В пути',
    total: 250000,
    items: [
      {
        id: 2,
        name: 'Двигатель Cummins 6BT',
        price: 250000,
        image: 'https://via.placeholder.com/400x300?text=Двигатель',
        quantity: 1,
      },
    ],
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Боковое меню */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeTab === 'orders'
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5" />
                <span>Мои заказы</span>
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeTab === 'favorites'
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span>Избранное</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg ${
                  activeTab === 'settings'
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Настройки</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50">
                <LogOut className="w-5 h-5" />
                <span>Выйти</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Основной контент */}
        <div className="md:col-span-3">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Мои заказы</h1>
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">Заказ #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        от {new Date(order.date).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status === 'Доставлен'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm text-gray-600"
                      >
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="font-semibold">
                      Итого: {order.total.toLocaleString('ru-RU')} ₽
                    </span>
                    <Link
                      href={`/profile/orders/${order.id}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-4">Избранное</h1>
              <p className="text-gray-600">
                У вас пока нет избранных товаров. Перейдите в{' '}
                <Link href="/catalog" className="text-blue-600 hover:text-blue-700">
                  каталог
                </Link>
                , чтобы добавить товары в избранное.
              </p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold mb-6">Настройки профиля</h1>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Имя
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон
                    </label>
                    <input
                      type="tel"
                      value={user.phone}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Адрес
                    </label>
                    <input
                      type="text"
                      value={user.address}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Сохранить изменения
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 