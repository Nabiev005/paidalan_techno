import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image }) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3>{name}</h3>
      <p className="price">{price.toLocaleString()} сом</p>
      <Link to={`/product/${id}`} className="btn">Толук маалымат</Link>
    </div>
  );
};

export default ProductCard;
