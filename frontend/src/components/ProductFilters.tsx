import { useState } from 'react';
import { products } from '@/mocks/products';

const getUnique = (arr: any[], key: string) => Array.from(new Set(arr.map((item) => item[key])));

export default function ProductFilters({ onFilter }: { onFilter: (results: any[]) => void }) {
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const categories = getUnique(products, 'category');
  const brands = getUnique(products, 'brand');

  const handleFilter = () => {
    let filtered = products;
    if (category) filtered = filtered.filter((p) => p.category === category);
    if (brand) filtered = filtered.filter((p) => p.brand === brand);
    if (minPrice) filtered = filtered.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) filtered = filtered.filter((p) => p.price <= Number(maxPrice));
    onFilter(filtered);
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <select className="input-field" value={category} onChange={e => { setCategory(e.target.value); handleFilter(); }}>
        <option value="">Все категории</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <select className="input-field" value={brand} onChange={e => { setBrand(e.target.value); handleFilter(); }}>
        <option value="">Все бренды</option>
        {brands.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Цена от"
          className="input-field"
          value={minPrice}
          onChange={e => { setMinPrice(e.target.value); handleFilter(); }}
        />
        <input
          type="number"
          placeholder="Цена до"
          className="input-field"
          value={maxPrice}
          onChange={e => { setMaxPrice(e.target.value); handleFilter(); }}
        />
      </div>
    </div>
  );
} 