// src/pages/Catalog.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Сүрөттөр
import Apple from "../assets/Apple1.jpg";
import Asus from "../assets/Asus1.jpg";
import HP from "../assets/HPPavilion.jpg";
import Lenevo from "../assets/Lenovo1.jpg";

import "../styles/Catalog.css";

const Catalog: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Товарлар массиви
  const products = [
    { id: 1, name: "Apple MacBook Air M1", brand: "Apple", price: 74990, discount: 10, isNew: true, image: Apple },
    { id: 2, name: "Apple MacBook Pro 14 M2", brand: "Apple", price: 125000, discount: 0, isNew: false, image: Apple },
    { id: 3, name: "ASUS TUF Gaming F15 (RTX 3050)", brand: "ASUS", price: 58990, discount: 5, isNew: false, image: Asus },
    { id: 4, name: "ASUS ZenBook 14 OLED", brand: "ASUS", price: 69990, discount: 0, isNew: true, image: Asus },
    { id: 5, name: "Lenovo IdeaPad 5 Ryzen 5", brand: "Lenovo", price: 42990, discount: 15, isNew: false, image: Lenevo },
    { id: 6, name: "Lenovo Legion 5 Pro RTX 3060", brand: "Lenovo", price: 84990, discount: 0, isNew: false, image: Lenevo },
    { id: 7, name: "HP Pavilion 15 i5 11th Gen", brand: "HP", price: 39990, discount: 0, isNew: true, image: HP },
    { id: 8, name: "HP Omen 16 RTX 3070", brand: "HP", price: 75990, discount: 10, isNew: false, image: HP },
    { id: 9, name: "Dell Inspiron 15 i7", brand: "Dell", price: 44990, discount: 0, isNew: false, image: HP },
    { id: 10, name: "Dell XPS 13 Plus", brand: "Dell", price: 99990, discount: 5, isNew: false, image: HP },
    { id: 11, name: "Acer Aspire 5 Slim", brand: "Acer", price: 37990, discount: 0, isNew: false, image: Asus },
    { id: 12, name: "Acer Predator Helios 300 i7", brand: "Acer", price: 89990, discount: 20, isNew: true, image: Asus },
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

      {/* Фильтрлер */}
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
          <option value="desc">Баасы (кымбат → арзан)</option>
        </select>
      </div>

      {/* Каталог */}
      <div className="catalog-grid">
        {filtered.length === 0 ? (
          <p className="no-results">Товар табылган жок.</p>
        ) : (
          filtered.map((product) => {
            const finalPrice =
              product.discount > 0
                ? product.price * (1 - product.discount / 100)
                : product.price;

            return (
              <div key={product.id} className="product-card">
                {/* Белгилер */}
                <div className="product-badges">
                  {product.isNew && <span className="badge new">Жаңы</span>}
                  {product.discount > 0 && (
                    <span className="badge discount">-{product.discount}%</span>
                  )}
                </div>

                {/* Сүрөт */}
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>

                {/* Баа */}
                {product.discount > 0 ? (
                  <p className="price">
                    <span className="old-price">
                      {product.price.toLocaleString()} сом
                    </span>
                    <span className="new-price">
                      {finalPrice.toLocaleString()} сом
                    </span>
                  </p>
                ) : (
                  <p className="price">{product.price.toLocaleString()} сом</p>
                )}

                {/* Кнопкалар */}
                <div className="product-actions">
                  {/* Избранное */}
                  <button
                    className="action-btn favorite"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    {favorites.includes(product.id) ? "❤️" : "🤍"}
                  </button>

                  {/* Себетке кошуу */}
                  <button
                    className="action-btn cart"
                    onClick={() => {
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: finalPrice,
                        image: product.image,
                      });
                      toast.success(`✅ ${product.name} себетке кошулду!`, {
                        position: "bottom-right",
                        autoClose: 2000,
                      });
                    }}
                  >
                    🛒 Себетке кошуу
                  </button>

                  {/* Толук маалымат */}
                  <button
                    className="action-btn info"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    🔍 Толук маалымат
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Catalog;
