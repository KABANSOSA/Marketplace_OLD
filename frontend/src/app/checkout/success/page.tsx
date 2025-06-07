'use client';

import React from 'react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Спасибо за заказ!
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Мы отправили подтверждение на ваш email
        </p>
        <div className="mt-6">
          <Link
            href="/catalog"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Продолжить покупки
          </Link>
          <Link
            href="/orders"
            className="ml-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Мои заказы
          </Link>
        </div>
      </div>
    </div>
  );
} 