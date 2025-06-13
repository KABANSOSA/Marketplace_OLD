import { useState } from 'react';
import { products } from '@/mocks/products';

export default function ProductSearch({ onSearch }: { onSearch: (results: any[]) => void }) {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.description.toLowerCase().includes(value.toLowerCase()) ||
        p.sku.toLowerCase().includes(value.toLowerCase())
    );
    onSearch(results);
  };

  return (
    <input
      type="text"
      placeholder="Поиск товаров..."
      className="input-field mb-4"
      value={query}
      onChange={handleChange}
    />
  );
} 