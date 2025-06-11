'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Upload, Package, BarChart2, Settings } from 'lucide-react';
import AddProductModal from '@/components/AddProductModal';

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
                    <div className="mt-4 flex space-x-4">
                      <button
                        onClick={() => document.getElementById('excel-upload')?.click()}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Загрузить Excel
                      </button>
                      <input
                        id="excel-upload"
                        type="file"
                        accept=".xlsx,.xls"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <button
                        onClick={() => setIsAddProductModalOpen(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <Package className="h-5 w-5 mr-2" />
                        Добавить товар
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
                      {error}
                    </div>
                  )}

                  {/* Здесь будет таблица товаров */}
                  <div className="mt-6">
                    <div className="flex flex-col">
                      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Название
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Цена
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Остаток
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Статус
                                  </th>
                                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Действия
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {/* Здесь будут строки с товарами */}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
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