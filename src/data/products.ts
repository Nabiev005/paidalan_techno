// src/data/products.ts
import Apple from "../assets/Apple1.jpg";
import Asus from "../assets/Asus1.jpg";
import HP from "../assets/HPPavilion.jpg";
import Lenevo from "../assets/Lenovo1.jpg";

export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  discount: number;
  isNew: boolean;
  image: string;
  category: string; // 🔑 коштук
};

export const products: Product[] = [
  { id: 1, name: "Apple MacBook Air M1", brand: "Apple", price: 74990, discount: 10, isNew: true, image: Apple, category: "офис" },
  { id: 2, name: "Apple MacBook Pro 14 M2", brand: "Apple", price: 125000, discount: 0, isNew: false, image: Apple, category: "программалоо" },
  { id: 3, name: "ASUS TUF Gaming F15 (RTX 3050)", brand: "ASUS", price: 58990, discount: 5, isNew: false, image: Asus, category: "гейминг" },
  { id: 4, name: "ASUS ZenBook 14 OLED", brand: "ASUS", price: 69990, discount: 0, isNew: true, image: Asus, category: "офис" },
  { id: 5, name: "Lenovo IdeaPad 5 Ryzen 5", brand: "Lenovo", price: 42990, discount: 15, isNew: false, image: Lenevo, category: "офис" },
  { id: 6, name: "Lenovo Legion 5 Pro RTX 3060", brand: "Lenovo", price: 84990, discount: 0, isNew: false, image: Lenevo, category: "архитектура" },
  { id: 7, name: "HP Pavilion 15 i5 11th Gen", brand: "HP", price: 39990, discount: 0, isNew: true, image: HP, category: "офис" },
  { id: 8, name: "HP Omen 16 RTX 3070", brand: "HP", price: 75990, discount: 10, isNew: false, image: HP, category: "гейминг" },
  { id: 9, name: "Dell Inspiron 15 i7", brand: "Dell", price: 44990, discount: 0, isNew: false, image: HP, category: "офис" },
  { id: 10, name: "Dell XPS 13 Plus", brand: "Dell", price: 99990, discount: 5, isNew: false, image: HP, category: "программалоо" },
  { id: 11, name: "Acer Aspire 5 Slim", brand: "Acer", price: 37990, discount: 0, isNew: false, image: Asus, category: "офис" },
  { id: 12, name: "Acer Predator Helios 300 i7", brand: "Acer", price: 89990, discount: 20, isNew: true, image: Asus, category: "гейминг" },
];
