import Link from "next/link";

export default function SellersPage() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Стать продавцом на Marketplace</h1>
      <p className="mb-6 text-lg">
        Продавайте свои товары миллионам покупателей! Получите доступ к удобному личному кабинету, аналитике и поддержке.
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>Быстрая регистрация</li>
        <li>Удобное добавление товаров вручную и через Excel</li>
        <li>Общение с покупателями прямо на сайте</li>
        <li>Современный и безопасный интерфейс</li>
      </ul>
      <div className="flex gap-4">
        <Link href="/register?seller=1" className="btn-primary">
          Зарегистрироваться как продавец
        </Link>
        <Link href="/login" className="btn-secondary">
          Войти
        </Link>
      </div>
    </div>
  );
} 