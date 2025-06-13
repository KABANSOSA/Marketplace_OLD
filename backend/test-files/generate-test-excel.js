const XLSX = require('xlsx');

// Тестовые данные для товаров
const products = [
  {
    name: "Гидроцилиндр подъема стрелы JCB 3CX",
    description: "Гидроцилиндр подъема стрелы для экскаватора-погрузчика JCB 3CX. Оригинальная запчасть, гарантия 12 месяцев.",
    price: 125000,
    category: "Гидравлика",
    brand: "JCB",
    model: "3CX",
    condition: "new"
  },
  {
    name: "Фильтр масляный для двигателя CAT C7",
    description: "Масляный фильтр для двигателя Caterpillar C7. Высокое качество фильтрации, совместимость с оригиналом.",
    price: 3500,
    category: "Фильтры",
    brand: "Caterpillar",
    model: "C7",
    condition: "new"
  },
  {
    name: "Тормозная колодка для погрузчика Volvo L120",
    description: "Тормозная колодка для фронтального погрузчика Volvo L120. Высококачественный фрикционный материал.",
    price: 8500,
    category: "Тормозная система",
    brand: "Volvo",
    model: "L120",
    condition: "new"
  },
  {
    name: "Ремень ГРМ для экскаватора Hitachi ZX200",
    description: "Ремень газораспределительного механизма для экскаватора Hitachi ZX200. Оригинальная запчасть.",
    price: 15000,
    category: "Двигатель",
    brand: "Hitachi",
    model: "ZX200",
    condition: "new"
  },
  {
    name: "Масло гидравлическое ISO 46",
    description: "Гидравлическое масло ISO 46 для спецтехники. Высококачественное масло с улучшенными противоизносными свойствами.",
    price: 2500,
    category: "Смазочные материалы",
    brand: "Shell",
    model: "Tellus S2 V",
    condition: "new"
  }
];

// Создаем новую книгу Excel
const workbook = XLSX.utils.book_new();

// Преобразуем данные в рабочий лист
const worksheet = XLSX.utils.json_to_sheet(products);

// Добавляем рабочий лист в книгу
XLSX.utils.book_append_sheet(workbook, worksheet, "Товары");

// Сохраняем файл
XLSX.writeFile(workbook, "test-files/products.xlsx");

console.log("Excel файл успешно создан: test-files/products.xlsx"); 