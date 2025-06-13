interface ProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images?: string[];
  specifications: {
    article: string;
    compatibility: string[];
    manufacturer: string;
    dimensions?: string;
    weight?: number;
    material?: string;
    [key: string]: any;
  };
  brand: string;
  model: string;
  condition: 'new' | 'used' | 'refurbished';
}

export const validateProduct = (data: any): string | null => {
  // Проверка обязательных полей
  const requiredFields = [
    'name', 
    'description', 
    'price', 
    'category', 
    'stock',
    'specifications',
    'brand',
    'model'
  ];

  for (const field of requiredFields) {
    if (!data[field]) {
      return `Поле ${field} обязательно для заполнения`;
    }
  }

  // Валидация названия
  if (typeof data.name !== 'string' || data.name.length < 3 || data.name.length > 200) {
    return 'Название запчасти должно содержать от 3 до 200 символов';
  }

  // Валидация описания
  if (typeof data.description !== 'string' || data.description.length < 10 || data.description.length > 2000) {
    return 'Описание запчасти должно содержать от 10 до 2000 символов';
  }

  // Валидация цены
  const price = Number(data.price);
  if (isNaN(price) || price <= 0) {
    return 'Цена должна быть положительным числом';
  }

  // Валидация категории
  if (typeof data.category !== 'string' || data.category.length < 2 || data.category.length > 50) {
    return 'Категория должна содержать от 2 до 50 символов';
  }

  // Валидация количества
  const stock = Number(data.stock);
  if (isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
    return 'Количество должно быть неотрицательным целым числом';
  }

  // Валидация изображений
  if (data.images) {
    if (!Array.isArray(data.images)) {
      return 'Поле images должно быть массивом';
    }
    for (const image of data.images) {
      if (typeof image !== 'string') {
        return 'Все изображения должны быть строками';
      }
    }
  }

  // Валидация спецификаций
  if (!data.specifications) {
    return 'Спецификации обязательны';
  }

  const specs = typeof data.specifications === 'string' 
    ? JSON.parse(data.specifications) 
    : data.specifications;

  if (typeof specs !== 'object' || Array.isArray(specs)) {
    return 'Спецификации должны быть объектом';
  }

  // Проверка обязательных полей спецификаций
  if (!specs.article) {
    return 'Артикул запчасти обязателен';
  }

  if (!specs.compatibility || !Array.isArray(specs.compatibility) || specs.compatibility.length === 0) {
    return 'Необходимо указать совместимость с техникой';
  }

  if (!specs.manufacturer) {
    return 'Производитель запчасти обязателен';
  }

  // Валидация веса, если указан
  if (specs.weight !== undefined) {
    const weight = Number(specs.weight);
    if (isNaN(weight) || weight < 0) {
      return 'Вес должен быть положительным числом';
    }
  }

  // Валидация бренда
  if (typeof data.brand !== 'string' || data.brand.length > 100) {
    return 'Бренд техники должен содержать не более 100 символов';
  }

  // Валидация модели
  if (typeof data.model !== 'string' || data.model.length > 100) {
    return 'Модель техники должна содержать не более 100 символов';
  }

  // Валидация состояния
  if (data.condition && !['new', 'used', 'refurbished'].includes(data.condition)) {
    return 'Некорректное состояние запчасти';
  }

  return null;
}; 