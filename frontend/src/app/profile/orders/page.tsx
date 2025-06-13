'use client';

import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

// Временные данные для демонстрации
const initialOrders: Order[] = [
  {
    id: '123456',
    date: '2024-03-15',
    status: 'delivered',
    total: 165000,
    items: [
      {
        id: 1,
        name: 'Гидроцилиндр экскаватора',
        quantity: 1,
        price: 45000,
        image: '/images/hydraulic-cylinder.jpg'
      },
      {
        id: 2,
        name: 'Гусеничная цепь бульдозера',
        quantity: 2,
        price: 120000,
        image: '/images/track-chain.jpg'
      }
    ]
  },
  {
    id: '123457',
    date: '2024-03-10',
    status: 'shipped',
    total: 85000,
    items: [
      {
        id: 3,
        name: 'Крюковая подвеска крана',
        quantity: 1,
        price: 85000,
        image: '/images/crane-hook.jpg'
      }
    ]
  }
];

export default function Orders() {
  const [orders] = useState<Order[]>(initialOrders);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'processing':
        return <Package className="w-5 h-5" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Ожидает обработки';
      case 'processing':
        return 'В обработке';
      case 'shipped':
        return 'Отправлен';
      case 'delivered':
        return 'Доставлен';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Мои заказы</h1>

        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Заказ #{order.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString('ru-RU')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flow-root">
                    <ul className="-my-4 divide-y divide-gray-200">
                      {order.items.map(item => (
                        <li key={item.id} className="flex py-4">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="object-cover rounded-lg"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{item.name}</h3>
                                <p className="ml-4">
                                  {(item.price * item.quantity).toLocaleString()} ₽
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.quantity} шт. × {item.price.toLocaleString()} ₽
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Итого</p>
                    <p>{order.total.toLocaleString()} ₽</p>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/profile/orders/${order.id}`}
                      className="text-primary hover:text-primary/90"
                    >
                      Подробнее о заказе →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 