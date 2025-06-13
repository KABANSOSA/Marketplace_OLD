import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { Product } from '../models/product.model';
import { validateProduct } from '../utils/validation';

export const bulkUploadProducts = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        detail: 'Файл не был загружен' 
      });
    }

    const filePath = req.file.path;
    const fileExt = path.extname(req.file.originalname).toLowerCase();
    let products: any[] = [];

    // Чтение файла в зависимости от его формата
    if (fileExt === '.xlsx') {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      products = XLSX.utils.sheet_to_json(worksheet);
    } else if (fileExt === '.csv') {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      products = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      });
    }

    // Удаляем временный файл
    fs.unlinkSync(filePath);

    // Валидация и обработка товаров
    const results = {
      total: products.length,
      success: 0,
      failed: 0,
      errors: [] as string[]
    };

    for (const [index, productData] of products.entries()) {
      try {
        // Валидация данных товара
        const validationError = validateProduct(productData);
        if (validationError) {
          throw new Error(validationError);
        }

        // Добавление ID продавца
        const sellerId = (req as any).user.id;
        const product = new Product({
          ...productData,
          sellerId
        });

        await product.save();
        results.success++;
      } catch (error: any) {
        results.failed++;
        results.errors.push(`Строка ${index + 2}: ${error.message}`);
      }
    }

    res.json({
      message: 'Загрузка товаров завершена',
      progress: results
    });
  } catch (error: any) {
    console.error('Ошибка при массовой загрузке товаров:', error);
    res.status(500).json({
      detail: 'Ошибка при обработке файла',
      error: error.message
    });
  }
};

export const downloadTemplate = async (req: Request, res: Response) => {
  try {
    const templatePath = path.join(__dirname, '../../templates/product_template.csv');
    
    if (!fs.existsSync(templatePath)) {
      // Создаем шаблон, если он не существует
      const headers = [
        'name',
        'description',
        'price',
        'category',
        'stock',
        'images',
        'specifications',
        'brand',
        'model',
        'condition'
      ].join(',');

      const example = [
        'Название товара',
        'Описание товара',
        '1000',
        'Электроника',
        '10',
        'image1.jpg,image2.jpg',
        '{"color":"black","size":"medium"}',
        'Производитель',
        'Модель',
        'new'
      ].join(',');

      const template = `${headers}\n${example}`;
      fs.writeFileSync(templatePath, template);
    }

    res.download(templatePath, 'product_template.csv');
  } catch (error: any) {
    console.error('Ошибка при скачивании шаблона:', error);
    res.status(500).json({
      detail: 'Ошибка при скачивании шаблона',
      error: error.message
    });
  }
}; 