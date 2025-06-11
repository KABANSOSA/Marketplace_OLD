'use client';

import { useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { toast } from 'react-hot-toast';

export default function BulkUploadPage() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    onDrop: async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
        setUploading(true);
        setProgress(0);

        const response = await fetch('/api/sellers/bulk-upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Ошибка при загрузке файла');
        }

        const result = await response.json();
        toast.success(`Успешно загружено ${result.successCount} товаров`);
      } catch (error) {
        toast.error('Ошибка при загрузке файла');
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
        setProgress(0);
      }
    }
  });

  const downloadTemplate = async () => {
    try {
      const response = await fetch('/api/sellers/bulk-upload/template');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'product_template.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error('Ошибка при скачивании шаблона');
      console.error('Template download error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Массовая загрузка товаров</h1>
      
      <div className="mb-6">
        <button
          onClick={downloadTemplate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Скачать шаблон (CSV)
        </button>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} disabled={uploading} />
        {uploading ? (
          <div>
            <p>Загрузка файла...</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-2">
              {isDragActive
                ? 'Отпустите файл для загрузки'
                : 'Перетащите файл сюда или нажмите для выбора'}
            </p>
            <p className="text-sm text-gray-500">
              Поддерживаемые форматы: CSV, XLSX, XLS
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 