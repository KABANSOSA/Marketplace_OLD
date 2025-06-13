'use client';

import { Truck, Shield, Clock, Headphones } from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Быстрая доставка',
    description: 'Доставляем заказы по всей России в кратчайшие сроки'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Гарантия качества',
    description: 'Все товары проходят тщательную проверку перед отправкой'
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: 'Работаем 24/7',
    description: 'Принимаем заказы круглосуточно, без выходных'
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: 'Поддержка',
    description: 'Профессиональная консультация по всем вопросам'
  }
];

export default function Features() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 