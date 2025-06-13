import Link from 'next/link';

export default function SellerFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">О компании</h3>
            <p className="text-gray-400">
              Мы специализируемся на поставках запчастей для спецтехники ведущих производителей.
              Гарантируем качество и надежность всех поставляемых компонентов.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Каталог запчастей</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/catalog/engine" className="text-gray-400 hover:text-white">
                  Двигатель
                </Link>
              </li>
              <li>
                <Link href="/catalog/transmission" className="text-gray-400 hover:text-white">
                  Трансмиссия
                </Link>
              </li>
              <li>
                <Link href="/catalog/chassis" className="text-gray-400 hover:text-white">
                  Ходовая часть
                </Link>
              </li>
              <li>
                <Link href="/catalog/hydraulics" className="text-gray-400 hover:text-white">
                  Гидравлика
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Для продавцов</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sellers/dashboard" className="text-gray-400 hover:text-white">
                  Панель управления
                </Link>
              </li>
              <li>
                <Link href="/sellers/products" className="text-gray-400 hover:text-white">
                  Управление товарами
                </Link>
              </li>
              <li>
                <Link href="/sellers/orders" className="text-gray-400 hover:text-white">
                  Заказы
                </Link>
              </li>
              <li>
                <Link href="/sellers/settings" className="text-gray-400 hover:text-white">
                  Настройки
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Телефон: +7 (XXX) XXX-XX-XX</li>
              <li>Email: support@marketplace.ru</li>
              <li>Адрес: г. Москва, ул. Примерная, д. 1</li>
              <li>Режим работы: Пн-Пт 9:00-18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Marketplace. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
} 