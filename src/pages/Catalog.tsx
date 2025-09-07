import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

// Сүрөттөрдү импорттоо (азырынча бар болгонун колдонобуз, реалдуу долбоордо ар башка сүрөт кошобуз)
import Apple from "../assets/Apple1.jpg";
import Asus from "../assets/Asus1.jpg";
import HP from "../assets/HPPavilion.jpg";
import Lenevo from "../assets/Lenovo1.jpg";

import "../styles/Catalog.css";

const Catalog: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();

  const products = [
  { id: 1, name: "Apple MacBook Air M1", brand: "Apple", price: 74990, image: Apple },
  { id: 2, name: "Apple MacBook Pro 14 M2", brand: "Apple", price: 125000, image: Apple },
  { id: 3, name: "ASUS TUF Gaming F15 (RTX 3050)", brand: "ASUS", price: 58990, image: Asus },
  { id: 4, name: "ASUS ZenBook 14 OLED", brand: "ASUS", price: 69990, image: Asus },
  { id: 5, name: "Lenovo IdeaPad 5 Ryzen 5", brand: "Lenovo", price: 42990, image: Lenevo },
  { id: 6, name: "Lenovo Legion 5 Pro RTX 3060", brand: "Lenovo", price: 84990, image: Lenevo },
  { id: 7, name: "HP Pavilion 15 i5 11th Gen", brand: "HP", price: 39990, image: HP },
  { id: 8, name: "HP Omen 16 RTX 3070", brand: "HP", price: 75990, image: HP },
  { id: 9, name: "Dell Inspiron 15 i7", brand: "Dell", price: 44990, image: HP },
  { id: 10, name: "Dell XPS 13 Plus", brand: "Dell", price: 99990, image: HP },
  { id: 11, name: "Acer Aspire 5 Slim", brand: "Acer", price: 37990, image: Asus },
  { id: 12, name: "Acer Predator Helios 300 i7", brand: "Acer", price: 89990, image: Asus },
];

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [brand, setBrand] = useState("All");

  // Издөө
  let filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Фильтр (бренд)
  if (brand !== "All") {
    filtered = filtered.filter((p) => p.brand === brand);
  }

  // Сорттоо
  if (sort === "asc") {
    filtered = filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filtered = filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="catalog">
      <h1>Ноутбуктар каталогу</h1>

      <div className="catalog-controls">
        <input
          type="text"
          placeholder="Издөө..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="All">Бардык бренддер</option>
          <option value="Apple">Apple</option>
          <option value="ASUS">ASUS</option>
          <option value="Lenovo">Lenovo</option>
          <option value="HP">HP</option>
          <option value="Dell">Dell</option>
          <option value="Acer">Acer</option>
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Сорттоо</option>
          <option value="asc">Баасы (арзан → кымбат)</option>
          <option value="desc">Баасы (кымпат → арзан)</option>
        </select>
      </div>

      <div className="catalog-grid">
        {filtered.length === 0 ? (
          <p>Товар табылган жок.</p>
        ) : (
          filtered.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p className="price">{product.price.toLocaleString()} сом</p>
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(product.id);
                }}
              >
                {favorites.includes(product.id) ? "❤️" : "🤍"}
              </button>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Catalog;
