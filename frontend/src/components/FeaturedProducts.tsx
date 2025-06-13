'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Гидравлический цилиндр',
    description: 'Гидравлический цилиндр для экскаватора Komatsu PC200, новый',
    price: 45000,
    image: 'https://via.placeholder.com/400x300?text=Гидравлический+цилиндр',
    category: 'Гидравлика',
    rating: 4.5,
    reviews: 12,
    inStock: true
  },
  {
    id: 2,
    name: 'Гусеничная цепь',
    description: 'Гусеничная цепь для бульдозера CAT D6, б/у в хорошем состоянии',
    price: 85000,
    image: 'https://via.placeholder.com/400x300?text=Гусеничная+цепь',
    category: 'Ходовая часть',
    rating: 4.8,
    reviews: 8,
    inStock: true
  },
  {
    id: 3,
    name: 'Гидравлический насос',
    description: 'Гидравлический насос для экскаватора Hitachi ZX200',
    price: 65000,
    image: 'https://via.placeholder.com/400x300?text=Гидравлический+насос',
    category: 'Гидравлика',
    rating: 4.6,
    reviews: 15,
    inStock: true
  },
  {
    id: 4,
    name: 'Масляный фильтр',
    description: 'Масляный фильтр для двигателя Cummins QSB6.7',
    price: 2500,
    image: 'https://via.placeholder.com/400x300?text=Масляный+фильтр',
    category: 'Запчасти',
    rating: 4.3,
    reviews: 20,
    inStock: true
  }
];

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <div 
          key={product.id}
          className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
        >
          <Link href={`/catalog/product/${product.id}`} className="block">
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gray-100" />
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                {product.name}
              </div>
            </div>
          </Link>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <Link 
                href={`/catalog/product/${product.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {product.name}
              </Link>
              <button
                onClick={() => toggleFavorite(product.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart 
                  className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`}
                />
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 text-sm font-medium text-gray-900">
                  {product.rating}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews} отзывов)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-gray-900">
                {product.price.toLocaleString('ru-RU')} ₽
              </div>
              <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 