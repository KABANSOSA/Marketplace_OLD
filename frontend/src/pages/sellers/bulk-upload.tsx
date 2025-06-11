import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import * as XLSX from 'xlsx';

interface UploadResult {
  success: number;
  failed: number;
  errors: string[];
}

const BulkUploadPage = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [preview, setPreview] = useState<any[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setResult(null);

    // Preview file contents
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        setPreview(jsonData.slice(0, 5)); // Show first 5 rows
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3002/api/v1/products/bulk-upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error uploading file:', error);
      setResult({
        success: 0,
        failed: 0,
        errors: ['Ошибка при загрузке файла'],
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bulk-upload-container">
      <Head>
        <title>Массовая загрузка товаров - Marketplace</title>
      </Head>

      <header className="bulk-upload-header">
        <h1>Массовая загрузка товаров</h1>
        <Link href="/sellers/dashboard" className="back-link">
          ← Назад к панели управления
        </Link>
      </header>

      <div className="upload-section">
        <div className="upload-card">
          <h2>Загрузка файла</h2>
          <p className="upload-description">
            Поддерживаются файлы Excel (.xlsx) и CSV (.csv). Максимальный размер файла: 10MB.
          </p>

          <div className="file-input-container">
            <input
              type="file"
              accept=".xlsx,.csv"
              onChange={handleFileChange}
              className="file-input"
            />
            <button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="upload-button"
            >
              {isUploading ? 'Загрузка...' : 'Загрузить'}
            </button>
          </div>

          {preview.length > 0 && (
            <div className="preview-section">
              <h3>Предпросмотр данных</h3>
              <div className="preview-table">
                <table>
                  <thead>
                    <tr>
                      {Object.keys(preview[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value: any, i) => (
                          <td key={i}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {result && (
            <div className={`result-section ${result.failed > 0 ? 'has-errors' : ''}`}>
              <h3>Результат загрузки</h3>
              <div className="result-stats">
                <div className="stat">
                  <span className="label">Успешно:</span>
                  <span className="value success">{result.success}</span>
                </div>
                <div className="stat">
                  <span className="label">Ошибок:</span>
                  <span className="value error">{result.failed}</span>
                </div>
              </div>
              {result.errors.length > 0 && (
                <div className="error-list">
                  <h4>Список ошибок:</h4>
                  <ul>
                    {result.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="template-section">
          <h2>Шаблон файла</h2>
          <p>
            Скачайте шаблон файла для массовой загрузки товаров. Файл содержит все
            необходимые поля и примеры заполнения.
          </p>
          <a
            href="/templates/products_template.xlsx"
            download
            className="template-button"
          >
            Скачать шаблон
          </a>
        </div>
      </div>

      <style jsx>{`
        .bulk-upload-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .bulk-upload-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .back-link {
          color: var(--text-secondary);
          text-decoration: none;
        }

        .upload-section {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .upload-card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .upload-description {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .file-input-container {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .file-input {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
        }

        .upload-button {
          padding: 0.5rem 1.5rem;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .upload-button:disabled {
          background: var(--border-color);
          cursor: not-allowed;
        }

        .preview-section {
          margin-top: 2rem;
        }

        .preview-table {
          overflow-x: auto;
          margin-top: 1rem;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          text-align: left;
        }

        th {
          background: var(--background-secondary);
          font-weight: 500;
        }

        .result-section {
          margin-top: 2rem;
          padding: 1rem;
          border-radius: 8px;
          background: var(--background-secondary);
        }

        .result-section.has-errors {
          background: var(--error-background);
        }

        .result-stats {
          display: flex;
          gap: 2rem;
          margin: 1rem 0;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .stat .label {
          color: var(--text-secondary);
        }

        .stat .value {
          font-weight: 600;
        }

        .stat .value.success {
          color: var(--success-color);
        }

        .stat .value.error {
          color: var(--error-color);
        }

        .error-list {
          margin-top: 1rem;
        }

        .error-list h4 {
          color: var(--error-color);
          margin-bottom: 0.5rem;
        }

        .error-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .error-list li {
          color: var(--error-color);
          padding: 0.25rem 0;
        }

        .template-section {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .template-button {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: var(--primary-color);
          color: white;
          text-decoration: none;
          border-radius: 4px;
          margin-top: 1rem;
          transition: all 0.3s ease;
        }

        .template-button:hover {
          background: var(--primary-color-dark);
        }

        @media (max-width: 768px) {
          .bulk-upload-container {
            padding: 1rem;
          }

          .upload-section {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default BulkUploadPage; 