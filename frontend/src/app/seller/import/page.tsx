'use client';
import { useRef } from 'react';

export default function ImportProductsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Заглушка для обработки файла
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Файл "${file.name}" загружен (заглушка)`);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Импорт товаров из Excel</h1>
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="mb-4"
      />
      <p className="text-gray-600">Загрузите файл Excel или CSV с товарами. В будущем здесь появится предпросмотр и импорт.</p>
    </div>
  );
} 