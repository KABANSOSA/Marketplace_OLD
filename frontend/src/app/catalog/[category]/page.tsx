'use client';

import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

interface FilterOption {
  id: string;
  name: string;
  options: {
    value: string;
    label: string;
    checked: boolean;
  }[];
}

const filters: FilterOption[] = [
  {
    id: 'price',
    name: 'Цена',
    options: [
      { value: '0-1000', label: 'До 1 000 ₽', checked: false },
      { value: '1000-5000', label: '1 000 - 5 000 ₽', checked: false },
      { value: '5000-10000', label: '5 000 - 10 000 ₽', checked: false },
      { value: '10000+', label: 'Более 10 000 ₽', checked: false },
    ],
  },
  {
    id: 'brand',
    name: 'Бренд',
    options: [
      { value: 'brand1', label: 'Бренд 1', checked: false },
      { value: 'brand2', label: 'Бренд 2', checked: false },
      { value: 'brand3', label: 'Бренд 3', checked: false },
    ],
  },
  {
    id: 'rating',
    name: 'Рейтинг',
    options: [
      { value: '4+', label: '4 и выше', checked: false },
      { value: '3+', label: '3 и выше', checked: false },
      { value: '2+', label: '2 и выше', checked: false },
    ],
  },
];

export default function CatalogPage({ params }: { params: { category: string } }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (filterId: string, value: string, checked: boolean) => {
    setActiveFilters((prev) => {
      const currentValues = prev[filterId] || [];
      if (checked) {
        return {
          ...prev,
          [filterId]: [...currentValues, value],
        };
      } else {
        return {
          ...prev,
          [filterId]: currentValues.filter((v) => v !== value),
        };
      }
    });
  };

  // Здесь будет загрузка товаров с учетом фильтров
  const products = [
    {
      id: '1',
      name: 'Товар 1',
      price: 9999,
      image: '/images/product1.jpg',
      seller: 'Продавец 1',
      rating: 4,
    },
    // Добавьте больше товаров
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {params.category.charAt(0).toUpperCase() + params.category.slice(1)}
          </h1>

          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Filter className="h-5 w-5" />
              <span className="ml-2 text-sm font-medium text-gray-700">Фильтры</span>
            </button>
          </div>
        </div>

        <div className="pt-24 pb-24 lg:grid lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-5">
          {/* Фильтры */}
          <aside className="hidden lg:block">
            <h2 className="sr-only">Фильтры</h2>

            <div className="space-y-10">
              {filters.map((filter) => (
                <div key={filter.id}>
                  <h3 className="text-sm font-medium text-gray-900">{filter.name}</h3>
                  <div className="mt-4 space-y-4">
                    {filter.options.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`${filter.id}-${option.value}`}
                          name={`${filter.id}[]`}
                          value={option.value}
                          type="checkbox"
                          checked={option.checked}
                          onChange={(e) =>
                            handleFilterChange(filter.id, option.value, e.target.checked)
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`${filter.id}-${option.value}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Список товаров */}
          <div className="mt-6 lg:col-span-3 lg:mt-0 xl:col-span-4">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Мобильные фильтры */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
          <div className="fixed inset-y-0 right-0 flex max-w-full flex-col overflow-y-auto bg-white py-6 pb-6 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Фильтры</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <ChevronDown className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-4 px-4">
              {filters.map((filter) => (
                <div key={filter.id} className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-900">{filter.name}</h3>
                  <div className="mt-4 space-y-4">
                    {filter.options.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`mobile-${filter.id}-${option.value}`}
                          name={`${filter.id}[]`}
                          value={option.value}
                          type="checkbox"
                          checked={option.checked}
                          onChange={(e) =>
                            handleFilterChange(filter.id, option.value, e.target.checked)
                          }
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`mobile-${filter.id}-${option.value}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 