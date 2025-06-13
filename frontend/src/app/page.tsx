'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCart, Heart, Star, Truck, Shield, Clock, ChevronRight, Percent } from 'lucide-react';
import './globals.css';

// Временные данные для демонстрации
const categories = [
  {
    id: 1,
    name: 'Двигатель',
    image: '/belt-demo.jpg',
    description: 'Двигатели, поршни, клапаны, прокладки'
  },
  {
    id: 2,
    name: 'Гидравлика',
    image: '/belt-demo.jpg',
    description: 'Гидронасосы, шланги, цилиндры, распределители'
  },
  {
    id: 3,
    name: 'Трансмиссия',
    image: '/belt-demo.jpg',
    description: 'Редукторы, коробки передач, сцепления'
  },
  {
    id: 4,
    name: 'Электрооборудование',
    image: '/belt-demo.jpg',
    description: 'Генераторы, стартеры, аккумуляторы, датчики'
  },
];

const featuredProducts = [
  {
    id: 1,
    name: 'Фильтр масляный CAT 1R-0751',
    price: 45000,
    oldPrice: 50000,
    image: '/belt-demo.jpg',
    isNew: true,
    discount: 10
  },
  {
    id: 2,
    name: 'Тормозная колодка CAT 1P-2295',
    price: 21250,
    image: '/belt-demo.jpg',
    isNew: false
  },
  {
    id: 3,
    name: 'Ремень привода CAT 4N-9999',
    price: 35000,
    oldPrice: 37000,
    image: '/belt-demo.jpg',
    discount: 5
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Александр Петров',
    company: 'ООО "ТехноСервис"',
    text: 'Отличный магазин! Быстрая доставка и качественные товары. Рекомендую!',
    rating: 5,
    image: 'https://via.placeholder.com/100x100?text=AP'
  },
  {
    id: 2,
    name: 'Иван Смирнов',
    company: 'ИП Смирнов',
    text: 'Очень доволен обслуживанием. Менеджеры всегда на связи и помогают с выбором.',
    rating: 5,
    image: 'https://via.placeholder.com/100x100?text=IS'
  },
  {
    id: 3,
    name: 'Мария Иванова',
    company: 'ООО "ТехМаркет"',
    text: 'Широкий ассортимент и приятные цены. Заказываем регулярно.',
    rating: 4,
    image: 'https://via.placeholder.com/100x100?text=MI'
  }
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  return (
    <main className="min-h-screen">
      {/* Hero секция */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">
              Маркетплейс запчастей для спецтехники
            </h1>
            <p className="text-xl mb-8">
              Современный маркетплейс для покупки и продажи запчастей для спецтехники
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="w-full px-4 py-3 rounded-lg text-gray-900"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4">
                  <p className="text-gray-600">Начните вводить название товара...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Категории</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/catalog?category=${category.id}`}
                className="group relative h-48 rounded-lg overflow-hidden"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="text-white text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm text-center">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Популярные товары */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Популярные товары</h2>
            <Link href="/catalog" className="flex items-center text-blue-600 hover:text-blue-700">
              Все товары <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                <div className="relative h-48">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isNew && (
                    <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                      Новинка
                    </span>
                  )}
                  {product.discount && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      {product.oldPrice && (
                        <span className="ml-2 text-gray-500 line-through">
                          {product.oldPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      )}
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <ShoppingCart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Акции и специальные предложения */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Акции и специальные предложения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Percent className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Скидка 15% на все аксессуары</h3>
                <p className="text-gray-600 mb-4">До конца месяца при заказе от 5 000 ₽</p>
                <Link href="/catalog?category=2" className="text-blue-600 hover:text-blue-700">
                  Подробнее <ChevronRight className="w-4 h-4 inline ml-1" />
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Бесплатная доставка</h3>
                <p className="text-gray-600 mb-4">При заказе от 10 000 ₽ по всей России</p>
                <Link href="/catalog" className="text-blue-600 hover:text-blue-700">
                  Подробнее <ChevronRight className="w-4 h-4 inline ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Отзывы клиентов */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Отзывы наших клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Быстрая доставка</h3>
                <p className="text-gray-600">Доставляем по всей России</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Гарантия качества</h3>
                <p className="text-gray-600">Проверенные поставщики</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Поддержка 24/7</h3>
                <p className="text-gray-600">Всегда на связи</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Каталог запчастей */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-8">Каталог запчастей</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center">
                <img src={category.image} alt={category.name} className="w-24 h-24 object-contain mb-4" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">{category.name}</h3>
                <p className="text-gray-500 text-center">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 