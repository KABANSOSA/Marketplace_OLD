'use client';

import Link from 'next/link';
import { Settings, Wrench, Zap, Package, Truck } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
  image: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Двигатели',
    description: 'Запчасти для двигателей спецтехники',
    icon: <Settings className="w-8 h-8" />,
    slug: 'engine',
    image: 'https://via.placeholder.com/400x300?text=Двигатели'
  },
  {
    id: 2,
    name: 'Гидравлика',
    description: 'Гидроцилиндры, насосы и комплектующие',
    icon: <Wrench className="w-8 h-8" />,
    slug: 'hydraulics',
    image: 'https://via.placeholder.com/400x300?text=Гидравлика'
  },
  {
    id: 3,
    name: 'Ходовая часть',
    description: 'Гусеницы, катки и натяжители',
    icon: <Truck className="w-8 h-8" />,
    slug: 'undercarriage',
    image: 'https://via.placeholder.com/400x300?text=Ходовая+часть'
  },
  {
    id: 4,
    name: 'Электрооборудование',
    description: 'Электронные компоненты и датчики',
    icon: <Zap className="w-8 h-8" />,
    slug: 'electrical',
    image: 'https://via.placeholder.com/400x300?text=Электрика'
  },
  {
    id: 5,
    name: 'Запчасти',
    description: 'Широкий выбор запчастей',
    icon: <Package className="w-8 h-8" />,
    slug: 'parts',
    image: 'https://via.placeholder.com/400x300?text=Запчасти'
  },
  {
    id: 6,
    name: 'Инструменты',
    description: 'Специальный инструмент и оборудование',
    icon: <Wrench className="w-8 h-8" />,
    slug: 'tools',
    image: 'https://via.placeholder.com/400x300?text=Инструменты'
  }
];

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/catalog/category/${category.slug}`}
          className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
        >
          <div className="aspect-[4/3] relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute inset-0 bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white transform group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {category.name}
            </h3>
            <p className="text-gray-600">
              {category.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid; 