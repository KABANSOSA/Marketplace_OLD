import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
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
  sellerId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Название запчасти обязательно'],
    trim: true,
    minlength: [3, 'Название должно содержать минимум 3 символа'],
    maxlength: [200, 'Название не должно превышать 200 символов']
  },
  description: {
    type: String,
    required: [true, 'Описание запчасти обязательно'],
    trim: true,
    minlength: [10, 'Описание должно содержать минимум 10 символов'],
    maxlength: [2000, 'Описание не должно превышать 2000 символов']
  },
  price: {
    type: Number,
    required: [true, 'Цена запчасти обязательна'],
    min: [0, 'Цена не может быть отрицательной']
  },
  category: {
    type: String,
    required: [true, 'Категория запчасти обязательна'],
    trim: true,
    minlength: [2, 'Категория должна содержать минимум 2 символа'],
    maxlength: [50, 'Категория не должна превышать 50 символов']
  },
  stock: {
    type: Number,
    required: [true, 'Количество запчастей обязательно'],
    min: [0, 'Количество не может быть отрицательным'],
    default: 0
  },
  images: [{
    type: String,
    trim: true
  }],
  specifications: {
    article: {
      type: String,
      required: [true, 'Артикул запчасти обязателен'],
      trim: true
    },
    compatibility: [{
      type: String,
      required: [true, 'Совместимость с техникой обязательна'],
      trim: true
    }],
    manufacturer: {
      type: String,
      required: [true, 'Производитель запчасти обязателен'],
      trim: true
    },
    dimensions: {
      type: String,
      trim: true
    },
    weight: {
      type: Number,
      min: [0, 'Вес не может быть отрицательным']
    },
    material: {
      type: String,
      trim: true
    }
  },
  brand: {
    type: String,
    required: [true, 'Бренд техники обязателен'],
    trim: true,
    maxlength: [100, 'Название бренда не должно превышать 100 символов']
  },
  model: {
    type: String,
    required: [true, 'Модель техники обязательна'],
    trim: true,
    maxlength: [100, 'Название модели не должно превышать 100 символов']
  },
  condition: {
    type: String,
    enum: {
      values: ['new', 'used', 'refurbished'],
      message: 'Некорректное состояние запчасти'
    },
    default: 'new'
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    required: [true, 'ID продавца обязателен']
  }
}, {
  timestamps: true
});

// Индексы для оптимизации поиска
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ sellerId: 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'specifications.article': 1 });
productSchema.index({ 'specifications.compatibility': 1 });
productSchema.index({ brand: 1, model: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema); 