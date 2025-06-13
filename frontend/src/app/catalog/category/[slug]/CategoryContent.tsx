'use client';

import { useState } from 'react';
import SearchAndFilter from '@/components/SearchAndFilter';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface Category {
  slug: string;
  name: string;
}

interface CategoryContentProps {
  category: Category;
  products: Product[];
}

export default function CategoryContent({ category, products }: CategoryContentProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (query: string) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleFilter = (filters: any) => {
    // Здесь будет логика фильтрации
    console.log('Filters:', filters);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Категория: {category.name}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Боковая панель с поиском и фильтрами */}
          <div className="lg:col-span-1">
            <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
          </div>

          {/* Сетка товаров */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="relative h-48">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                    <p className="text-xl font-bold text-blue-600">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 