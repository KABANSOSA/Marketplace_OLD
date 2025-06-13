'use client';
import { useState } from 'react';

export default function AddProductPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  // Заглушка для отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Товар "${name}" с ценой ${price} ₽ добавлен (заглушка)`);
    setName('');
    setPrice('');
  };

  return (
    <div className="max-w-md mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Добавить товар</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Название товара"
          className="input-field"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Цена"
          className="input-field"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">Добавить</button>
      </form>
    </div>
  );
} 