'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

interface PartCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  specifications: Record<string, string>;
  manufacturer: string;
  inStock: boolean;
  onAddToCart: (id: number) => void;
}

export default function PartCard({
  id,
  name,
  category,
  price,
  image,
  specifications,
  manufacturer,
  inStock,
  onAddToCart
}: PartCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">Нет в наличии</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {name}
            </h3>
            <p className="text-gray-600">{category}</p>
            <p className="text-sm text-gray-500 mt-1">Производитель: {manufacturer}</p>
          </div>
          <span className="text-2xl font-bold text-blue-600">
            {price.toLocaleString()} ₽
          </span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-gray-900 mb-2">
            Технические характеристики:
          </h4>
          <ul className="space-y-1">
            {Object.entries(specifications).map(([key, value]) => (
              <li key={key} className="text-gray-600">
                {key}: {value}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={() => onAddToCart(id)}
          disabled={!inStock}
          className={`mt-6 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
            inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          {inStock ? 'Добавить в корзину' : 'Нет в наличии'}
        </button>
      </div>
    </div>
  );
} 