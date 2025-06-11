'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  seller: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Товар 1',
      price: 9999,
      image: '/images/product1.jpg',
      quantity: 1,
      seller: 'Продавец 1',
    },
    // Добавьте больше товаров
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-24 pb-24">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Корзина</h1>

          {cartItems.length === 0 ? (
            <div className="mt-8 text-center">
              <h2 className="text-lg font-medium text-gray-900">Ваша корзина пуста</h2>
              <p className="mt-2 text-sm text-gray-500">
                Добавьте товары в корзину, чтобы оформить заказ
              </p>
              <div className="mt-6">
                <Link
                  href="/catalog"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Перейти в каталог
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
              <div className="lg:col-span-7">
                <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={150}
                          height={150}
                          className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="text-sm">
                              <Link href={`/product/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                                {item.name}
                              </Link>
                            </h4>
                            <p className="ml-4 text-sm font-medium text-gray-900">
                              {item.price.toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.seller}</p>
                        </div>

                        <div className="mt-4 flex-1 flex items-end justify-between">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Minus className="h-5 w-5" />
                            </button>
                            <span className="mx-2 text-gray-500">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <Plus className="h-5 w-5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-sm font-medium text-red-600 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Итого */}
              <div className="mt-10 lg:mt-0 lg:col-span-5">
                <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                  <h2 className="text-lg font-medium text-gray-900">Итого</h2>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Товары ({cartItems.length})</p>
                      <p className="text-sm font-medium text-gray-900">
                        {total.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Доставка</p>
                      <p className="text-sm font-medium text-gray-900">Бесплатно</p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <p className="text-base font-medium text-gray-900">Итого к оплате</p>
                        <p className="text-base font-medium text-gray-900">
                          {total.toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href="/checkout"
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Оформить заказ
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 