import React from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import Apple from "../assets/Apple1.jpg";
import Asus from "../assets/Asus1.jpg";
import HP from "../assets/HPPavilion.jpg";
import Lenevo from "../assets/Lenovo1.jpg";
import "../styles/Favorites.css";

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();

  // Каталогдогу бардык товарлар (реалдуу учурда бекендден келет)
  const products = [
    { id: 1, name: "Apple MacBook Air M1", price: 74990, image: Apple },
    { id: 2, name: "ASUS TUF Gaming F15", price: 58990, image: Asus },
    { id: 3, name: "Lenovo IdeaPad 5", price: 42990, image: Lenevo },
    { id: 4, name: "HP Pavilion 15", price: 39990, image: HP },
  ];

  // Сүйүктүүлөрдү чыпкалоо
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="favorites">
      <h1>❤️ Сүйүктүү товарлар</h1>

      {favoriteProducts.length === 0 ? (
        <p className="empty">Сүйүктүүлөр тизмеси бош</p>
      ) : (
        <div className="favorites-grid">
          {favoriteProducts.map((product) => (
            <div className="favorite-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()} сом</p>
              </Link>
              <button
                className="remove-btn"
                onClick={() => toggleFavorite(product.id)}
              >
                ❌ Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
