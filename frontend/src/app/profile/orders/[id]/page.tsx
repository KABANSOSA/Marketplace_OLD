import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OrderContent from './OrderContent';

// Временные данные для демонстрации
const orders = [
  {
    id: 1,
    number: 'ORD-001',
    date: '2024-02-15',
    status: 'completed',
    total: 15000,
    items: [
      {
        id: 1,
        name: 'Гидроцилиндр подъема',
        price: 15000,
        quantity: 1,
        image: 'https://via.placeholder.com/100x100?text=Гидроцилиндр',
      },
    ],
  },
  {
    id: 2,
    number: 'ORD-002',
    date: '2024-02-14',
    status: 'processing',
    total: 250000,
    items: [
      {
        id: 2,
        name: 'Двигатель Cummins',
        price: 250000,
        quantity: 1,
        image: 'https://via.placeholder.com/100x100?text=Двигатель',
      },
    ],
  },
];

export async function generateStaticParams() {
  return orders.map((order) => ({
    id: order.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const order = orders.find((o) => o.id.toString() === params.id);
  if (!order) {
    return {
      title: 'Заказ не найден',
    };
  }

  return {
    title: `Заказ ${order.number} - История заказов`,
    description: `Информация о заказе ${order.number} от ${order.date}`,
  };
}

export default function OrderPage({ params }: { params: { id: string } }) {
  const order = orders.find((o) => o.id.toString() === params.id);
  if (!order) {
    notFound();
  }

  return <OrderContent order={order} />;
} 