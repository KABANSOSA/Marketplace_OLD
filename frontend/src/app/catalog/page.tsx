'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/mocks/products';
import { Product } from '@/types/product';

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: 'all', name: 'Все запчасти' },
  { id: 'Фильтры и масла', name: 'Фильтры и масла' },
  { id: 'Тормозная система', name: 'Тормозная система' },
  { id: 'Приводные ремни', name: 'Приводные ремни' },
  { id: 'Электрооборудование', name: 'Электрооборудование' },
  { id: 'Гидравлика', name: 'Гидравлика' },
  { id: 'Двигатель', name: 'Двигатель' },
  { id: 'Подшипники', name: 'Подшипники' }
];

async function getProducts(category: string) {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (category === 'all') {
    return products;
  }
  
  return products.filter(product => product.category === category);
}

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => getProducts(selectedCategory)
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-red-600">Ошибка при загрузке товаров</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Каталог запчастей</h1>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 