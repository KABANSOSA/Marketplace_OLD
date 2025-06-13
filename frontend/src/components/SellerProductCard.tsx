type SellerProductCardProps = {
  product: {
    id: number;
    name: string;
    price: number;
  };
};

export default function SellerProductCard({ product }: SellerProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2">
      <div className="font-semibold text-lg">{product.name}</div>
      <div className="text-gray-600">Цена: {product.price} ₽</div>
      <div className="flex gap-2 mt-2">
        <button className="btn-primary">Редактировать</button>
        <button className="btn-secondary">Удалить</button>
      </div>
    </div>
  );
} 