export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  specifications: {
    'Производитель': string;
    'Номер по каталогу': string;
    'Применяемость': string;
    [key: string]: string;
  };
} 