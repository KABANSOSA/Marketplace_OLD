'use client';
import { products } from '@/mocks/products';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.imageUrl} alt={product.name} className="w-64 h-64 object-contain bg-white rounded-lg shadow" />
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="text-gray-600">{product.description}</div>
          <div className="text-xl font-bold text-blue-700">{product.price} ₽</div>
          <div className="flex gap-4 mt-2">
            <AddToCartButton product={product} />
            <Link href={`/chat?seller=${product.brand}`} className="btn-secondary">Задать вопрос продавцу</Link>
          </div>
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Характеристики</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Категория: {product.category}</li>
              <li>Бренд: {product.brand}</li>
              <li>Артикул: {product.sku}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { products } = await import('@/mocks/products');
  return products.map((product) => ({ id: product.id }));
} 