'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CreditCard, Truck, MapPin } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  seller: string;
}

interface DeliveryMethod {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<'delivery' | 'payment'>('delivery');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: '',
    paymentMethod: '',
  });

  // Пример данных заказа
  const orderItems: OrderItem[] = [
    {
      id: '1',
      name: 'Товар 1',
      price: 9999,
      image: '/images/product1.jpg',
      quantity: 1,
      seller: 'Продавец 1',
    },
  ];

  const deliveryMethods: DeliveryMethod[] = [
    {
      id: 'standard',
      name: 'Стандартная доставка',
      price: 0,
      description: 'Доставка курьером в течение 2-3 дней',
    },
    {
      id: 'express',
      name: 'Экспресс доставка',
      price: 500,
      description: 'Доставка курьером на следующий день',
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Банковской картой',
      description: 'Оплата картой Visa, Mastercard или МИР',
    },
    {
      id: 'cash',
      name: 'Наличными при получении',
      description: 'Оплата наличными курьеру при доставке',
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'delivery') {
      setStep('payment');
    } else {
      // Здесь будет логика отправки заказа на сервер
      console.log('Order submitted:', formData);
      router.push('/checkout/success');
    }
  };

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedDelivery = deliveryMethods.find((m) => m.id === formData.deliveryMethod);
  const finalTotal = total + (selectedDelivery?.price || 0);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-24 pb-24">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Оформление заказа</h1>

          <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit}>
                {step === 'delivery' ? (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">Информация о доставке</h2>
                      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            Имя
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Фамилия
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Телефон
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Адрес
                          </label>
                          <input
                            type="text"
                            name="address"
                            id="address"
                            required
                            value={formData.address}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            Город
                          </label>
                          <input
                            type="text"
                            name="city"
                            id="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                            Индекс
                          </label>
                          <input
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            required
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium text-gray-900">Способ доставки</h2>
                      <div className="mt-6 space-y-4">
                        {deliveryMethods.map((method) => (
                          <div key={method.id} className="flex items-center">
                            <input
                              type="radio"
                              name="deliveryMethod"
                              id={method.id}
                              value={method.id}
                              required
                              checked={formData.deliveryMethod === method.id}
                              onChange={handleInputChange}
                              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor={method.id} className="ml-3 block text-sm font-medium text-gray-700">
                              <div className="flex items-center">
                                <Truck className="h-5 w-5 text-gray-400" />
                                <span className="ml-2">{method.name}</span>
                              </div>
                              <p className="ml-7 text-sm text-gray-500">{method.description}</p>
                              <p className="ml-7 text-sm font-medium text-gray-900">
                                {method.price === 0 ? 'Бесплатно' : `${method.price} ₽`}
                              </p>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Способ оплаты</h2>
                    <div className="mt-6 space-y-4">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center">
                          <input
                            type="radio"
                            name="paymentMethod"
                            id={method.id}
                            value={method.id}
                            required
                            checked={formData.paymentMethod === method.id}
                            onChange={handleInputChange}
                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <label htmlFor={method.id} className="ml-3 block text-sm font-medium text-gray-700">
                            <div className="flex items-center">
                              <CreditCard className="h-5 w-5 text-gray-400" />
                              <span className="ml-2">{method.name}</span>
                            </div>
                            <p className="ml-7 text-sm text-gray-500">{method.description}</p>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  {step === 'payment' && (
                    <button
                      type="button"
                      onClick={() => setStep('delivery')}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      ← Назад к доставке
                    </button>
                  )}
                  <button
                    type="submit"
                    className="ml-auto flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    {step === 'delivery' ? 'Продолжить' : 'Оформить заказ'}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-10 lg:mt-0 lg:col-span-5">
              <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                <h2 className="text-lg font-medium text-gray-900">Ваш заказ</h2>
                <div className="mt-6 flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {orderItems.map((item) => (
                      <li key={item.id} className="flex items-center py-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-20 w-20 rounded-md object-center object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                          <p className="mt-1 text-sm text-gray-500">Количество: {item.quantity}</p>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            {item.price.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Товары ({orderItems.length})</p>
                    <p className="text-sm font-medium text-gray-900">
                      {total.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                  {selectedDelivery && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Доставка</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedDelivery.price === 0
                          ? 'Бесплатно'
                          : `${selectedDelivery.price.toLocaleString('ru-RU')} ₽`}
                      </p>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-base font-medium text-gray-900">Итого к оплате</p>
                      <p className="text-base font-medium text-gray-900">
                        {finalTotal.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 