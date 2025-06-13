'use client';

import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Заказ успешно оформлен!</h1>
        <p className="text-gray-600 mb-8">
          Спасибо за ваш заказ. Мы отправили подтверждение на вашу электронную
          почту. Вы можете отслеживать статус заказа в личном кабинете.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/profile"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Мои заказы
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Продолжить покупки
          </Link>
        </div>
      </div>
    </main>
  );
} 