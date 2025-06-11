'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Package, Truck, Shield, CreditCard } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Реализовать поиск
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Логотип */}
            <Link href="/" className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Marketplace</span>
            </Link>

            {/* Поиск */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск товаров..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Навигация */}
            <nav className="flex items-center space-x-4">
              <Link href="/cart" className="text-gray-600 hover:text-gray-900">
                <ShoppingCart className="h-6 w-6" />
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                <User className="h-6 w-6" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Главный контент */}
      <main>
        {/* Баннер */}
        <div className="bg-blue-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                Добро пожаловать в Marketplace
              </h1>
              <p className="mt-6 text-xl text-blue-100">
                Ваш надежный партнер в мире покупок
              </p>
            </div>
          </div>
        </div>

        {/* Категории */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Популярные категории</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {['Электроника', 'Одежда', 'Дом и сад', 'Спорт'].map((category) => (
              <Link
                key={category}
                href={`/catalog/${category.toLowerCase()}`}
                className="group relative rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* Здесь будет изображение категории */}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Преимущества */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <Truck className="h-12 w-12 text-blue-600 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Быстрая доставка</h3>
                <p className="mt-2 text-base text-gray-500">
                  Доставляем заказы по всей России
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Гарантия качества</h3>
                <p className="mt-2 text-base text-gray-500">
                  Проверенные продавцы и товары
                </p>
              </div>
              <div className="text-center">
                <CreditCard className="h-12 w-12 text-blue-600 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Безопасная оплата</h3>
                <p className="mt-2 text-base text-gray-500">
                  Защищенные платежи
                </p>
              </div>
              <div className="text-center">
                <Package className="h-12 w-12 text-blue-600 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">Широкий выбор</h3>
                <p className="mt-2 text-base text-gray-500">
                  Тысячи товаров в каталоге
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Популярные товары */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Популярные товары</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Здесь будут карточки товаров */}
          </div>
        </div>
      </main>

      {/* Подвал */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                О компании
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link href="/about" className="text-base text-gray-300 hover:text-white">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-base text-gray-300 hover:text-white">
                    Вакансии
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
                  <Link href="/help" className="text-base text-gray-300 hover:text-white">
                    Помощь
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-base text-gray-300 hover:text-white">
                    Доставка
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-base text-gray-300 hover:text-white">
                    Возврат
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Контакты
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="tel:+79991234567" className="text-base text-gray-300 hover:text-white">
                    +7 (999) 123-45-67
                  </a>
                </li>
                <li>
                  <a href="mailto:info@marketplace.ru" className="text-base text-gray-300 hover:text-white">
                    info@marketplace.ru
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                Мы в соцсетях
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    ВКонтакте
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-300 hover:text-white">
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400 text-center">
              © 2024 Marketplace. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 