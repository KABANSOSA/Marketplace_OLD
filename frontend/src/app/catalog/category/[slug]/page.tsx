import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryContent from './CategoryContent';

// Временные данные для демонстрации
const categories = [
  { slug: 'hydraulics', name: 'Гидравлика' },
  { slug: 'engines', name: 'Двигатели' },
  { slug: 'spare-parts', name: 'Запчасти' },
  { slug: 'tools', name: 'Инструменты' },
];

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) {
    return {
      title: 'Категория не найдена',
    };
  }

  return {
    title: `${category.name} - Каталог запчастей`,
    description: `Купить ${category.name.toLowerCase()} для спецтехники. Широкий выбор, доступные цены, гарантия качества.`,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) {
    notFound();
  }

  // Временные данные для демонстрации
  const products = [
    {
      id: 1,
      name: 'Гидроцилиндр подъема',
      price: 15000,
      image: 'https://via.placeholder.com/300x200?text=Гидроцилиндр',
      category: 'hydraulics',
    },
    {
      id: 2,
      name: 'Двигатель Cummins',
      price: 250000,
      image: 'https://via.placeholder.com/300x200?text=Двигатель',
      category: 'engines',
    },
  ].filter((product) => product.category === params.slug);

  return <CategoryContent category={category} products={products} />;
} 