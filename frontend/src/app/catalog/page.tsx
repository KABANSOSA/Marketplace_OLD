// frontend/src/app/catalog/page.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Filter, ChevronDown, Star, ShoppingCart } from 'lucide-react';
import { products as mockProducts } from '@/mocks/products';
import ProductSearch from '@/components/ProductSearch';
import ProductFilters from '@/components/ProductFilters';

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
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const handleSearch = (results: any[]) => {
    setFilteredProducts(results);
  };

  const handleFilter = (results: any[]) => {
    setFilteredProducts(results);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Каталог товаров</h1>
      <ProductSearch onSearch={handleSearch} />
      <ProductFilters onFilter={handleFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">Товары не найдены</div>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 bg-white flex flex-col gap-2">
              <img src={product.imageUrl} alt={product.name} className="h-32 object-contain mb-2" />
              <div className="font-semibold text-lg">{product.name}</div>
              <div className="text-gray-600 text-sm mb-1">{product.description}</div>
              <div className="text-gray-900 font-bold mb-2">{product.price} ₽</div>
              <button className="btn-primary">В корзину</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}