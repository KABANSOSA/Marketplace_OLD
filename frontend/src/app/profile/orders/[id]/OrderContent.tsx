'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Package, Truck, CreditCard } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  number: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
}

interface OrderContentProps {
  order: Order;
}

export default function OrderContent({ order }: OrderContentProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Выполнен';
      case 'processing':
        return 'В обработке';
      case 'cancelled':
        return 'Отменен';
      default:
        return status;
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/profile/orders"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к списку заказов
        </Link>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Заказ {order.number}
              </h1>
              <p className="text-gray-600">от {order.date}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                order.status
              )}`}
            >
              {getStatusText(order.status)}
            </span>
          </div>

          <div className="space-y-6">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-gray-600">
                    Количество: {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {item.price.toLocaleString('ru-RU')} ₽
                  </p>
                  <p className="text-gray-600">
                    Итого: {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-900">Итого:</span>
              <span className="text-2xl font-bold text-gray-900">
                {order.total.toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Package className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-medium text-gray-900">
                Информация о доставке
              </h2>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>Стандартная доставка</p>
              <p>ул. Примерная, д. 1</p>
              <p>Москва, 123456</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-medium text-gray-900">
                Информация об оплате
              </h2>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>Способ оплаты: Банковской картой</p>
              <p>Статус: Оплачено</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 