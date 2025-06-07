'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import { products } from '@/mocks/products';

async function searchProducts(query: string) {
  // Имитируем задержку сети
  await new Promise(resolve => setTimeout(resolve, 1000));
  const searchQuery = query.toLowerCase();
  return products.filter(
    product =>
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery)
  );
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchProducts(query),
    enabled: !!query,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Результаты поиска: {query}
      </h1>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Поиск товаров...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600">
            Произошла ошибка при поиске товаров
          </p>
        </div>
      ) : products?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            По вашему запросу ничего не найдено
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
} 