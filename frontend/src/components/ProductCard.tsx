'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-48 w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-2">
          {product.specifications['Производитель']}
        </p>
        
        <p className="text-sm text-gray-500 mb-4">
          Артикул: {product.specifications['Номер по каталогу']}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
} 