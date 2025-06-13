'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Upload, Package, BarChart2, Settings } from 'lucide-react';
import AddProductModal from '@/components/AddProductModal';
import SellerProductCard from '@/components/SellerProductCard';
import Link from 'next/link';

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError('');

    try {
      await api.post('/products/upload-excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Обновить список товаров после загрузки
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при загрузке файла');
    } finally {
      setLoading(false);
    }
  };

  // Заглушка для списка товаров
  const products = [
    { id: 1, name: 'Товар 1', price: 10000 },
    { id: 2, name: 'Товар 2', price: 15000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Верхняя панель с навигацией */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Личный кабинет продавца</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <Settings className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="mt-6">
          <div className="bg-white shadow rounded-lg">
            {/* Табы */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`${
                    activeTab === 'products'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Package className="h-5 w-5 mr-2" />
                  Товары
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`${
                    activeTab === 'analytics'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm flex items-center`}
                >
                  <BarChart2 className="h-5 w-5 mr-2" />
                  Аналитика
                </button>
              </nav>
            </div>

            {/* Контент табов */}
            <div className="p-6">
              {activeTab === 'products' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Управление товарами</h2>
                    <div className="mt-4 flex gap-4">
                      <Link href="/seller/add-product" className="btn-primary">Добавить товар</Link>
                      <Link href="/seller/import" className="btn-secondary">Импорт из Excel</Link>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
                      {error}
                    </div>
                  )}

                  {/* Здесь будет таблица товаров */}
                  <div className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {products.map((product) => (
                        <SellerProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Аналитика продаж</h2>
                  {/* Здесь будет график и статистика */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onSuccess={() => {
          // Обновить список товаров после добавления
          setIsAddProductModalOpen(false);
        }}
      />
    </div>
  );
} 