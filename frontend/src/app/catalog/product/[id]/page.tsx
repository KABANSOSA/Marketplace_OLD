import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductContent from './ProductContent';

// Временные данные для демонстрации
const products = [
  {
    id: 1,
    name: 'Гидроцилиндр подъема',
    description: 'Высококачественный гидроцилиндр для спецтехники. Изготовлен из прочных материалов, обеспечивает надежную работу в любых условиях.',
    price: 15000,
    oldPrice: 18000,
    image: 'https://via.placeholder.com/300x200?text=Гидроцилиндр',
    category: 'hydraulics',
    specifications: {
      'Диаметр': '100 мм',
      'Ход': '500 мм',
      'Давление': '20 МПа',
      'Материал': 'Сталь',
    },
    inStock: true,
    isNew: true,
    discount: 15,
    rating: 4.8,
    reviews: 12
  },
  {
    id: 2,
    name: 'Двигатель Cummins',
    description: 'Мощный и надежный двигатель Cummins для спецтехники. Отличное соотношение цена/качество.',
    price: 250000,
    oldPrice: 280000,
    image: 'https://via.placeholder.com/300x200?text=Двигатель',
    category: 'engines',
    specifications: {
      'Мощность': '300 л.с.',
      'Объем': '6.7 л',
      'Топливо': 'Дизель',
      'Норма': 'Евро-5',
    },
    inStock: true,
    isNew: false,
    discount: 10,
    rating: 4.9,
    reviews: 8
  },
];

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = products.find((p) => p.id.toString() === params.id);
  if (!product) {
    return {
      title: 'Товар не найден',
    };
  }

  return {
    title: `${product.name} - Каталог запчастей`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id.toString() === params.id);
  if (!product) {
    notFound();
  }

  return <ProductContent product={product} />;
} 