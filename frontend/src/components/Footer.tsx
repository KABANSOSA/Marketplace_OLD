import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const navigation = {
  main: [
    { name: 'О нас', href: '/about' },
    { name: 'Блог', href: '/blog' },
    { name: 'Вакансии', href: '/jobs' },
    { name: 'Партнерам', href: '/partners' },
    { name: 'Контакты', href: '/contacts' },
  ],
  support: [
    { name: 'Центр поддержки', href: '/support' },
    { name: 'Безопасность', href: '/safety' },
    { name: 'Доставка', href: '/delivery' },
    { name: 'Возврат', href: '/returns' },
  ],
  legal: [
    { name: 'Политика конфиденциальности', href: '/privacy' },
    { name: 'Условия использования', href: '/terms' },
    { name: 'Правовая информация', href: '/legal' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: Facebook,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: Instagram,
    },
    {
      name: 'YouTube',
      href: '#',
      icon: Youtube,
    },
  ],
};

const categories = [
  { name: 'Гидравлика', href: '/catalog?category=hydraulics' },
  { name: 'Двигатели', href: '/catalog?category=engines' },
  { name: 'Запчасти', href: '/catalog?category=spare-parts' },
  { name: 'Инструменты', href: '/catalog?category=tools' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">О компании</h3>
            <p className="text-gray-400">
              Мы предлагаем широкий выбор запчастей для спецтехники от
              проверенных производителей.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Каталог</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-400 hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Информация</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery"
                  className="text-gray-400 hover:text-white"
                >
                  Доставка
                </Link>
              </li>
              <li>
                <Link
                  href="/payment"
                  className="text-gray-400 hover:text-white"
                >
                  Оплата
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-gray-400 hover:text-white"
                >
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Телефон: +7 (999) 123-45-67</li>
              <li>Email: info@marketplace.ru</li>
              <li>Адрес: г. Москва, ул. Примерная, д. 1</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Marketplace. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
} 