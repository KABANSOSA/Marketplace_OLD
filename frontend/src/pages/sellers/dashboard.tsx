import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface SellerStats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  averageRating: number;
}

const SellerDashboardPage = () => {
  const router = useRouter();
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [sellerName, setSellerName] = useState<string | null>(null);
  const [stats, setStats] = useState<SellerStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedSellerId = localStorage.getItem('sellerId');
    const storedSellerName = localStorage.getItem('sellerName');

    if (!token || !storedSellerId) {
      router.push('/sellers/login');
      return;
    }

    setSellerId(storedSellerId);
    setSellerName(storedSellerName);

    // Загрузка статистики
    const fetchStats = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/v1/sellers/${storedSellerId}/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке статистики:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  if (!sellerId || isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Загрузка данных...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Head>
        <title>Панель управления продавца - Marketplace</title>
      </Head>

      <header className="dashboard-header">
        <h1>Панель управления продавца</h1>
        <p className="welcome-message">Добро пожаловать, {sellerName || `Продавец ${sellerId}`}!</p>
      </header>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Товары</h3>
            <div className="stat-value">{stats.totalProducts}</div>
            <div className="stat-label">Всего товаров</div>
            <div className="stat-subvalue">{stats.activeProducts} активных</div>
          </div>

          <div className="stat-card">
            <h3>Заказы</h3>
            <div className="stat-value">{stats.totalOrders}</div>
            <div className="stat-label">Всего заказов</div>
            <div className="stat-subvalue">{stats.pendingOrders} ожидают обработки</div>
          </div>

          <div className="stat-card">
            <h3>Доход</h3>
            <div className="stat-value">{stats.totalRevenue.toLocaleString()} ₽</div>
            <div className="stat-label">Общий доход</div>
          </div>

          <div className="stat-card">
            <h3>Рейтинг</h3>
            <div className="stat-value">{stats.averageRating.toFixed(1)}</div>
            <div className="stat-label">Средняя оценка</div>
          </div>
        </div>
      )}

      <div className="dashboard-actions">
        <Link href={`/sellers/${sellerId}/products`} className="dashboard-button">
          <span className="button-icon">📦</span>
          <span className="button-text">Мои товары</span>
        </Link>
        <Link href="/sellers/add-product" className="dashboard-button">
          <span className="button-icon">➕</span>
          <span className="button-text">Добавить товар</span>
        </Link>
        <Link href="/sellers/bulk-upload" className="dashboard-button">
          <span className="button-icon">📤</span>
          <span className="button-text">Массовая загрузка</span>
        </Link>
        <Link href="/sellers/orders" className="dashboard-button">
          <span className="button-icon">📋</span>
          <span className="button-text">Заказы</span>
        </Link>
        <Link href="/sellers/analytics" className="dashboard-button">
          <span className="button-icon">📊</span>
          <span className="button-text">Аналитика</span>
        </Link>
        <Link href="/sellers/profile" className="dashboard-button">
          <span className="button-icon">👤</span>
          <span className="button-text">Профиль</span>
        </Link>
        <Link href="/sellers/settings" className="dashboard-button">
          <span className="button-icon">⚙️</span>
          <span className="button-text">Настройки</span>
        </Link>
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .dashboard-header {
          margin-bottom: 2rem;
        }

        .welcome-message {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .stat-card h3 {
          color: var(--text-secondary);
          margin: 0 0 1rem 0;
          font-size: 1rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--text-primary);
          font-weight: 500;
        }

        .stat-subvalue {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-top: 0.25rem;
        }

        .dashboard-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .dashboard-button {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          background: white;
          color: var(--text-primary);
          text-decoration: none;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .dashboard-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          background: var(--primary-color);
          color: white;
        }

        .button-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
        }

        .button-text {
          font-weight: 500;
        }

        .loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid var(--border-color);
          border-top: 4px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SellerDashboardPage; 