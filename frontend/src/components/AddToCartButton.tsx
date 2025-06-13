import { useCart } from '@/contexts/CartContext';

export default function AddToCartButton({ product }: { product: { id: string; name: string; price: number; imageUrl: string } }) {
  const { addToCart } = useCart();

  return (
    <button
      className="btn-primary"
      onClick={() => addToCart(product)}
    >
      В корзину
    </button>
  );
} 