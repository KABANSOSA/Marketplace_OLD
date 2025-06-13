'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Временные данные для демонстрации
const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Гидроцилиндр Komatsu PC200',
    price: 85000,
    image: 'https://via.placeholder.com/400x300?text=Гидроцилиндр',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Двигатель Cummins 6BT',
    price: 250000,
    image: 'https://via.placeholder.com/400x300?text=Двигатель',
    quantity: 1,
  },
];

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Корзина</h1>
      {cart.length === 0 ? (
        <div className="text-gray-500">Ваша корзина пуста</div>
      ) : (
        <>
          <table className="w-full mb-6">
            <thead>
              <tr>
                <th className="text-left">Товар</th>
                <th>Цена</th>
                <th>Кол-во</th>
                <th>Сумма</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 flex items-center gap-2">
                    <img src={item.imageUrl} alt={item.name} className="h-10 w-10 object-contain" />
                    {item.name}
                  </td>
                  <td className="text-center">{item.price} ₽</td>
                  <td className="text-center">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => updateQuantity(item.id, Number(e.target.value))}
                      className="w-16 text-center border rounded"
                    />
                  </td>
                  <td className="text-center">{item.price * item.quantity} ₽</td>
                  <td className="text-center">
                    <button className="btn-secondary" onClick={() => removeFromCart(item.id)}>Удалить</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mb-4">
            <div className="text-xl font-bold">Итого: {total} ₽</div>
            <button className="btn-secondary" onClick={clearCart}>Очистить корзину</button>
          </div>
          <Link href="/checkout" className="btn-primary">Оформить заказ</Link>
        </>
      )}
    </div>
  );
} 