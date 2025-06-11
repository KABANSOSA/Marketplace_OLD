'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: number;
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'favorites' | 'settings'>('profile');

  // Пример данных пользователя
  const userProfile: UserProfile = {
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    avatar: '/images/avatar.jpg',
  };

  // Пример данных заказов
  const orders: Order[] = [
    {
      id: '123456',
      date: '2024-03-15',
      status: 'delivered',
      total: 9999,
      items: 2,
    },
    {
      id: '123457',
      date: '2024-03-10',
      status: 'shipped',
      total: 4999,
      items: 1,
    },
  ];

  const getStatusText = (status: Order['status']) => {
    const statusMap = {
      pending: 'Ожидает обработки',
      processing: 'В обработке',
      shipped: 'Отправлен',
      delivered: 'Доставлен',
    };
    return statusMap[status];
  };

  const getStatusColor = (status: Order['status']) => {
    const colorMap = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
    };
    return colorMap[status];
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-24 pb-24">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
            {/* Боковое меню */}
            <div className="lg:col-span-3">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'profile'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <User className="mr-3 h-5 w-5" />
                  Профиль
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'orders'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Package className="mr-3 h-5 w-5" />
                  Мои заказы
                </button>
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'favorites'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Heart className="mr-3 h-5 w-5" />
                  Избранное
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'settings'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Settings className="mr-3 h-5 w-5" />
                  Настройки
                </button>
                <button
                  onClick={() => {
                    // Здесь будет логика выхода
                    console.log('Logout');
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Выйти
                </button>
              </div>
            </div>

            {/* Основной контент */}
            <div className="mt-8 lg:mt-0 lg:col-span-9">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Профиль</h2>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <Image
                        src={userProfile.avatar}
                        alt={userProfile.name}
                        width={96}
                        height={96}
                        className="h-24 w-24 rounded-full"
                      />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-medium text-gray-900">{userProfile.name}</h3>
                      <p className="text-sm text-gray-500">{userProfile.email}</p>
                      <p className="text-sm text-gray-500">{userProfile.phone}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Мои заказы</h2>
                  <div className="mt-6">
                    <div className="flow-root">
                      <ul className="-my-5 divide-y divide-gray-200">
                        {orders.map((order) => (
                          <li key={order.id} className="py-5">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Заказ #{order.id}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {new Date(order.date).toLocaleDateString('ru-RU')}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {order.items} {order.items === 1 ? 'товар' : 'товара'}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {getStatusText(order.status)}
                                </span>
                                <p className="ml-4 text-sm font-medium text-gray-900">
                                  {order.total.toLocaleString('ru-RU')} ₽
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Избранное</h2>
                  <div className="mt-6">
                    <p className="text-sm text-gray-500">
                      Здесь будут отображаться товары, которые вы добавили в избранное.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Настройки</h2>
                  <div className="mt-6 space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Уведомления</h3>
                      <div className="mt-4 space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="email-notifications"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="email-notifications" className="ml-3 text-sm text-gray-700">
                            Email-уведомления
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="sms-notifications"
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor="sms-notifications" className="ml-3 text-sm text-gray-700">
                            SMS-уведомления
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Безопасность</h3>
                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Изменить пароль
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 