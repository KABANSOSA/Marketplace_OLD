import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Header = () => {
  const router = useRouter();
  const [sellerId, setSellerId] = useState<string | null>(null);
  const [sellerName, setSellerName] = useState<string | null>(null);

  useEffect(() => {
    setSellerId(localStorage.getItem('sellerId'));
    setSellerName(localStorage.getItem('sellerName'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sellerId');
    localStorage.removeItem('sellerName');
    router.push('/sellers/login');
  };

  return (
    <header className="header">
      <div className="header-content container">
        <div className="logo">
          <Link href="/" className="logo-link">
            Marketplace
          </Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Искать товары..." />
          <button>Поиск</button>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <Link href="/" className="nav-link">
                Главная
              </Link>
            </li>
            {sellerId ? (
              <>
                <li>
                  <Link href="/sellers/dashboard" className="nav-link">
                    Дашборд ({sellerName || `Продавец ${sellerId}`})
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    Выйти
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/sellers/login" className="nav-link">
                  Вход для продавцов
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;