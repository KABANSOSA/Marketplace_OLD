import { products } from '@/mocks/products';
import ProductDetails from './ProductDetails';

interface ProductPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductDetails id={params.id} />;
} 