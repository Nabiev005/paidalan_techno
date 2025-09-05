import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
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
      name: "ASUS TUF Gaming F15",
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
      id: 3,
      name: "Lenovo IdeaPad 5",
      price: 58990,
      images: [Lenevo, Lenevo, Lenevo],
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
      name: "HP Pavilion 15",
      price: 58990,
      images: [Hp, Hp, Hp],
      specs: {
        cpu: "Intel Core i7-11800H",
        ram: "16GB",
        storage: "512GB SSD",
        display: '15.6" FHD 144Hz',
        gpu: "NVIDIA RTX 3050 Ti",
      },
    },
  ];

  const product = products.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || "");

  if (!product) {
    return <h2>Продукт табылган жок</h2>;
  }

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
          <li>
            <strong>CPU:</strong> {product.specs.cpu}
          </li>
          <li>
            <strong>RAM:</strong> {product.specs.ram}
          </li>
          <li>
            <strong>Storage:</strong> {product.specs.storage}
          </li>
          <li>
            <strong>Display:</strong> {product.specs.display}
          </li>
          <li>
            <strong>GPU:</strong> {product.specs.gpu}
          </li>
        </ul>
        <button
          className="add-to-cart"
          onClick={() =>
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: selectedImage,
            })
          }
        >
          🛒 Себетке кошуу
        </button>
      </div>
    </div>
  );
};

export default Product;
