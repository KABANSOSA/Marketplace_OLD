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

export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Marketplace
            </Link>
            <p className="text-gray-500 text-base">
              Ваш надежный маркетплейс для покупок и продаж. Мы предлагаем широкий выбор товаров и
              удобный сервис для продавцов.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Поддержка
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Компания
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Правовая информация
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Контакты
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <p className="text-base text-gray-500">
                      Email: info@marketplace.com
                    </p>
                  </li>
                  <li>
                    <p className="text-base text-gray-500">
                      Телефон: +7 (999) 123-45-67
                    </p>
                  </li>
                  <li>
                    <p className="text-base text-gray-500">
                      Адрес: г. Москва, ул. Примерная, д. 1
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} Marketplace. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
} 