// src/pages/Product.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

import Apple from "../assets/Apple1.jpg";
import Asus from "../assets/Asus1.jpg";
import Hp from "../assets/HPPavilion.jpg";
import Lenevo from "../assets/Lenovo1.jpg";
import "../styles/Product.css";

const Product: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: "Apple MacBook Air M1",
      price: 74990,
      images: [Apple, Apple, Apple],
      specs: {
        cpu: "Apple M1 Chip",
        ram: "8GB",
        storage: "256GB SSD",
        display: '13.3" Retina',
        gpu: "Integrated 7-core GPU",
      },
    },
    {
      id: 2,
      name: "Apple MacBook Pro 14 M2",
      price: 125000,
      images: [Apple, Apple, Apple],
      specs: {
        cpu: "Apple M2 Pro",
        ram: "16GB",
        storage: "512GB SSD",
        display: '14" Liquid Retina XDR',
        gpu: "10-core GPU",
      },
    },
    {
      id: 3,
      name: "ASUS TUF Gaming F15 (RTX 3050)",
      price: 58990,
      images: [Asus, Asus, Asus],
      specs: {
        cpu: "Intel Core i7-11800H",
        ram: "16GB",
        storage: "512GB SSD",
        display: '15.6" FHD 144Hz',
        gpu: "NVIDIA RTX 3050 Ti",
      },
    },
    {
      id: 4,
      name: "ASUS ZenBook 14 OLED",
      price: 69990,
      images: [Asus, Asus, Asus],
      specs: {
        cpu: "AMD Ryzen 7 5800U",
        ram: "16GB",
        storage: "1TB SSD",
        display: '14" OLED FHD',
        gpu: "Integrated Radeon Graphics",
      },
    },
    {
      id: 5,
      name: "Lenovo IdeaPad 5 Ryzen 5",
      price: 42990,
      images: [Lenevo, Lenevo, Lenevo],
      specs: {
        cpu: "AMD Ryzen 5 5500U",
        ram: "8GB",
        storage: "512GB SSD",
        display: '15.6" FHD IPS',
        gpu: "Integrated Radeon Graphics",
      },
    },
    {
      id: 6,
      name: "Lenovo Legion 5 Pro RTX 3060",
      price: 84990,
      images: [Lenevo, Lenevo, Lenevo],
      specs: {
        cpu: "AMD Ryzen 7 5800H",
        ram: "16GB",
        storage: "1TB SSD",
        display: '16" WQXGA 165Hz',
        gpu: "NVIDIA RTX 3060",
      },
    },
    {
      id: 7,
      name: "HP Pavilion 15 i5 11th Gen",
      price: 39990,
      images: [Hp, Hp, Hp],
      specs: {
        cpu: "Intel Core i5-1135G7",
        ram: "8GB",
        storage: "512GB SSD",
        display: '15.6" FHD IPS',
        gpu: "Intel Iris Xe Graphics",
      },
    },
    {
      id: 8,
      name: "HP Omen 16 RTX 3070",
      price: 75990,
      images: [Hp, Hp, Hp],
      specs: {
        cpu: "Intel Core i7-11800H",
        ram: "16GB",
        storage: "1TB SSD",
        display: '16.1" FHD 144Hz',
        gpu: "NVIDIA RTX 3070",
      },
    },
    {
      id: 9,
      name: "Dell Inspiron 15 i7",
      price: 44990,
      images: [Hp, Hp, Hp],
      specs: {
        cpu: "Intel Core i7-1165G7",
        ram: "8GB",
        storage: "512GB SSD",
        display: '15.6" FHD',
        gpu: "Intel Iris Xe Graphics",
      },
    },
    {
      id: 10,
      name: "Dell XPS 13 Plus",
      price: 99990,
      images: [Hp, Hp, Hp],
      specs: {
        cpu: "Intel Core i7-1260P",
        ram: "16GB",
        storage: "1TB SSD",
        display: '13.4" OLED 3.5K',
        gpu: "Intel Iris Xe Graphics",
      },
    },
    {
      id: 11,
      name: "Acer Aspire 5 Slim",
      price: 37990,
      images: [Asus, Asus, Asus],
      specs: {
        cpu: "AMD Ryzen 5 5500U",
        ram: "8GB",
        storage: "256GB SSD",
        display: '15.6" FHD IPS',
        gpu: "Integrated Radeon Graphics",
      },
    },
    {
      id: 12,
      name: "Acer Predator Helios 300 i7",
      price: 89990,
      images: [Asus, Asus, Asus],
      specs: {
        cpu: "Intel Core i7-12700H",
        ram: "16GB",
        storage: "1TB SSD",
        display: '15.6" QHD 165Hz',
        gpu: "NVIDIA RTX 3060",
      },
    },
  ];

  const product = products.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || "");

  if (!product) {
    return <h2>Продукт табылган жок</h2>;
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedImage,
    });

    toast.success(`✅ ${product.name} себетке кошулду!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="product-page">
      <button className="back-button" onClick={() => navigate("/catalog")}>
        ← Артка
      </button>

      <div className="product-image-container">
        <img
          src={selectedImage}
          alt={product.name}
          className="product-page-image"
        />

        <div className="image-thumbnails">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name}-${index}`}
              className={`thumbnail ${selectedImage === img ? "active" : ""}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">{product.price.toLocaleString()} сом</p>
        <ul className="specs">
          <li><strong>CPU:</strong> {product.specs.cpu}</li>
          <li><strong>RAM:</strong> {product.specs.ram}</li>
          <li><strong>Storage:</strong> {product.specs.storage}</li>
          <li><strong>Display:</strong> {product.specs.display}</li>
          <li><strong>GPU:</strong> {product.specs.gpu}</li>
        </ul>
        <button className="add-to-cart" onClick={handleAddToCart}>
          🛒 Себетке кошуу
        </button>
      </div>
    </div>
  );
};

export default Product;
