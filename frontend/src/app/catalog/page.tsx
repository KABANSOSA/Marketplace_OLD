// frontend/src/app/catalog/page.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Filter, ChevronDown, Star, ShoppingCart } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  isNew?: boolean;
  discount?: number;
}

// Временные данные для демонстрации
const products: Product[] = [
  {
    id: 1,
    name: 'Фильтр масляный CAT 1R-0751',
    price: 45000,
    oldPrice: 50000,
    image: '/belt-demo.jpg',
    category: 'Фильтры и масла',
    inStock: true,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 2,
    name: 'Тормозная колодка CAT 1P-2295',
    price: 21250,
    image: '/belt-demo.jpg',
    category: 'Тормозная система',
    inStock: true,
    rating: 4.9,
    reviews: 8
  },
  {
    id: 3,
    name: 'Ремень привода CAT 4N-9999',
    price: 35000,
    oldPrice: 37000,
    image: '/belt-demo.jpg',
    category: 'Трансмиссия',
    inStock: true,
    rating: 4.5,
    reviews: 15
  },
  {
    id: 4,
    name: 'Гидронасос Bosch Rexroth',
    price: 120000,
    image: '/belt-demo.jpg',
    category: 'Гидравлика',
    inStock: true,
    rating: 4.7,
    reviews: 10
  },
  {
    id: 5,
    name: 'Аккумуляторная батарея CAT 6T-5901',
    price: 125000,
    image: '/belt-demo.jpg',
    category: 'Электрооборудование',
    inStock: true,
    rating: 4.6,
    reviews: 7
  },
  {
    id: 6,
    name: 'Подшипник SKF 6205-2Z',
    price: 2500,
    image: '/belt-demo.jpg',
    category: 'Подшипники',
    inStock: true,
    rating: 4.4,
    reviews: 5
  },
];

const categories = [
  { id: 1, name: 'Двигатель' },
  { id: 2, name: 'Гидравлика' },
  { id: 3, name: 'Трансмиссия' },
  { id: 4, name: 'Электрооборудование' },
  { id: 5, name: 'Фильтры и масла' },
  { id: 6, name: 'Тормозная система' },
  { id: 7, name: 'Подшипники' }
];

const sortOptions = [
  { id: 'popular', name: 'По популярности' },
  { id: 'price-asc', name: 'По возрастанию цены' },
  { id: 'price-desc', name: 'По убыванию цены' },
  { id: 'new', name: 'По новизне' }
];

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory) {
        const category = categories.find((c) => c.id === selectedCategory);
        return product.category === category?.name;
      }
      return true;
    })
    .filter((product) => {
      return product.price >= priceRange.min && product.price <= priceRange.max;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'new':
          return a.isNew ? -1 : b.isNew ? 1 : 0;
        default:
          return b.rating - a.rating;
      }
    });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Фильтры */}
        <div className="w-full md:w-64">
          <div className="md:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm"
            >
              <span className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Фильтры
              </span>
              <ChevronDown
                className={`w-5 h-5 transform transition-transform ${
                  showFilters ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          <div
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block bg-white rounded-lg shadow-sm p-4`}
          >
            <h2 className="font-semibold mb-4">Категории</h2>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category.id}
                    onChange={() => setSelectedCategory(category.id)}
                    className="text-blue-600"
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>

            <div className="mt-6">
              <h2 className="font-semibold mb-4">Цена</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: Number(e.target.value) })
                    }
                    className="w-full px-2 py-1 border rounded"
                    placeholder="От"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: Number(e.target.value) })
                    }
                    className="w-full px-2 py-1 border rounded"
                    placeholder="До"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Список товаров */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Каталог товаров</h1>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 p-4 flex flex-col items-center"
              >
                <img src={product.image} alt={product.name} className="w-24 h-24 object-contain mb-4" />
                <h3 className="text-lg font-semibold text-blue-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <div className="text-xl font-bold text-blue-900 mb-2">{product.price} ₽</div>
                {product.oldPrice && (
                  <div className="text-sm line-through text-gray-400 mb-2">{product.oldPrice} ₽</div>
                )}
                {product.inStock ? (
                  <span className="inline-block px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">В наличии</span>
                ) : (
                  <span className="inline-block px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full">Нет в наличии</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}