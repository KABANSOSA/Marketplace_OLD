import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface AnalyticsData {
  sales: {
    date: string;
    amount: number;
    orders: number;
  }[];
  products: {
    category: string;
    count: number;
  }[];
  revenue: {
    total: number;
    average: number;
    growth: number;
  };
  orders: {
    total: number;
    pending: number;
    completed: number;
    cancelled: number;
  };
  topProducts: {
    name: string;
    sales: number;
    revenue: number;
  }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const SellerAnalyticsPage = () => {
  const router = useRouter();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('week');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const sellerId = localStorage.getItem('sellerId');

    if (!token || !sellerId) {
      router.push('/sellers/login');
      return;
    }

    const fetchAnalytics = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/v1/sellers/${sellerId}/analytics?timeRange=${timeRange}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(data);
        }
      } catch (error) {
        console.error('Ошибка при загрузке аналитики:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [router, timeRange]);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Загрузка данных...</p>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <Head>
        <title>Аналитика - Marketplace</title>
      </Head>

      <header className="analytics-header">
        <h1>Аналитика</h1>
        <Link href="/sellers/dashboard" className="back-link">
          ← Назад к панели управления
        </Link>
      </header>

      <div className="time-range-selector">
        <button
          className={timeRange === 'week' ? 'active' : ''}
          onClick={() => setTimeRange('week')}
        >
          Неделя
        </button>
        <button
          className={timeRange === 'month' ? 'active' : ''}
          onClick={() => setTimeRange('month')}
        >
          Месяц
        </button>
        <button
          className={timeRange === 'year' ? 'active' : ''}
          onClick={() => setTimeRange('year')}
        >
          Год
        </button>
      </div>

      {analyticsData && (
        <>
          <div className="stats-overview">
            <div className="stat-card">
              <h3>Общий доход</h3>
              <div className="stat-value">
                {analyticsData.revenue.total.toLocaleString()} ₽
              </div>
              <div className="stat-change">
                {analyticsData.revenue.growth > 0 ? '+' : ''}
                {analyticsData.revenue.growth}%
              </div>
            </div>
            <div className="stat-card">
              <h3>Средний чек</h3>
              <div className="stat-value">
                {analyticsData.revenue.average.toLocaleString()} ₽
              </div>
            </div>
            <div className="stat-card">
              <h3>Заказы</h3>
              <div className="stat-value">{analyticsData.orders.total}</div>
              <div className="stat-subvalue">
                {analyticsData.orders.pending} ожидают обработки
              </div>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-card">
              <h3>Продажи по времени</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData.sales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    name="Доход"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    stroke="#82ca9d"
                    name="Заказы"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Товары по категориям</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analyticsData.products}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {analyticsData.products.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <h3>Топ продаваемых товаров</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData.topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" name="Продажи" />
                  <Bar dataKey="revenue" fill="#82ca9d" name="Доход" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .analytics-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .analytics-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .back-link {
          color: var(--text-secondary);
          text-decoration: none;
        }

        .time-range-selector {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .time-range-selector button {
          padding: 0.5rem 1rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .time-range-selector button.active {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }

        .stats-overview {
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

        .stat-change {
          color: var(--success-color);
          font-weight: 500;
        }

        .stat-subvalue {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 1.5rem;
        }

        .chart-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .chart-card h3 {
          color: var(--text-secondary);
          margin: 0 0 1rem 0;
          font-size: 1rem;
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
          .analytics-container {
            padding: 1rem;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SellerAnalyticsPage; 