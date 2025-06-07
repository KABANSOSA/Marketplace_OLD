'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              О компании
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Контакты
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Вакансии
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Каталог
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/catalog?category=Электроника"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Электроника
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog?category=Аксессуары"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Аксессуары
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Поддержка
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/shipping"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Доставка
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Возврат
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Контакты
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="text-base text-gray-500">
                Телефон: +7 (999) 123-45-67
              </li>
              <li className="text-base text-gray-500">
                Email: info@marketplace.ru
              </li>
              <li className="text-base text-gray-500">
                Адрес: г. Москва, ул. Примерная, д. 1
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Marketplace. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
} 