import Link from 'next/link';
import Head from 'next/head';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Marketplace - Ваша платформа для продажи и покупки товаров</title>
      </Head>

      <header className="header">
        <div className="header-content">
          <Link href="/" className="logo">
            Marketplace
          </Link>
          <nav className="main-nav">
            <Link href="/catalog">Каталог</Link>
            <Link href="/about">О нас</Link>
            <Link href="/contacts">Контакты</Link>
          </nav>
          <div className="auth-buttons">
            <Link href="/sellers/login" className="seller-button">
              Личный кабинет
            </Link>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <h1>Добро пожаловать в Marketplace</h1>
          <p className="subtitle">Ваша платформа для продажи и покупки товаров</p>
        </section>

        <section className="features">
          <div className="feature-card">
            <h2>Для продавцов</h2>
            <p>Управляйте своими товарами, отслеживайте продажи и развивайте свой бизнес</p>
            <div className="feature-actions">
              <Link href="/sellers/login" className="primary-button">
                Войти как продавец
              </Link>
              <Link href="/sellers/register" className="secondary-button">
                Зарегистрироваться
              </Link>
            </div>
          </div>

          <div className="feature-card">
            <h2>Для покупателей</h2>
            <p>Находите лучшие товары от проверенных продавцов</p>
            <div className="feature-actions">
              <Link href="/catalog" className="primary-button">
                Перейти в каталог
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>О компании</h3>
            <ul>
              <li><Link href="/about">О нас</Link></li>
              <li><Link href="/contacts">Контакты</Link></li>
              <li><Link href="/careers">Вакансии</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Каталог</h3>
            <ul>
              <li><Link href="/catalog/electronics">Электроника</Link></li>
              <li><Link href="/catalog/accessories">Аксессуары</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Поддержка</h3>
            <ul>
              <li><Link href="/delivery">Доставка</Link></li>
              <li><Link href="/returns">Возврат</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Контакты</h3>
            <ul>
              <li>Телефон: +7 (999) 123-45-67</li>
              <li>Email: info@marketplace.ru</li>
              <li>Адрес: г. Москва, ул. Примерная, д. 1</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Marketplace. Все права защищены.</p>
        </div>
      </footer>

      <style jsx>{`
        .header {
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
          text-decoration: none;
        }

        .main-nav {
          display: flex;
          gap: 2rem;
        }

        .main-nav a {
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 500;
        }

        .main-nav a:hover {
          color: var(--primary-color);
        }

        .seller-button {
          padding: 0.5rem 1rem;
          background: var(--primary-color);
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .seller-button:hover {
          background: var(--primary-color-dark);
        }

        .main-content {
          margin-top: 80px;
          padding: 2rem;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero {
          text-align: center;
          margin-bottom: 4rem;
        }

        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: var(--primary-color);
        }

        .subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .feature-card {
          padding: 2rem;
          border-radius: 15px;
          background: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-card h2 {
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .feature-card p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .feature-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .primary-button, .secondary-button {
          display: block;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .primary-button {
          background: var(--primary-color);
          color: white;
        }

        .primary-button:hover {
          background: var(--primary-color-dark);
        }

        .secondary-button {
          background: transparent;
          color: var(--primary-color);
          border: 2px solid var(--primary-color);
        }

        .secondary-button:hover {
          background: var(--primary-color-light);
        }

        .footer {
          background: var(--background-secondary);
          padding: 4rem 2rem 2rem;
          margin-top: 4rem;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .footer-section h3 {
          color: var(--text-primary);
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section ul li {
          margin-bottom: 0.5rem;
        }

        .footer-section ul li a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-section ul li a:hover {
          color: var(--primary-color);
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 2rem auto 0;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          text-align: center;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .header-content {
            padding: 1rem;
            flex-direction: column;
            gap: 1rem;
          }

          .main-nav {
            gap: 1rem;
          }

          .main-content {
            padding: 1rem;
            margin-top: 120px;
          }

          .hero h1 {
            font-size: 2rem;
          }

          .footer {
            padding: 2rem 1rem 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default HomePage;
