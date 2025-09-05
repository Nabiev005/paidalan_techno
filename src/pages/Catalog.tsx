import React, { useState } from "react";
import { Link } from "react-router-dom";
import Apple from "../assets/Apple1.jpg"
import Asus from "../assets/Asus1.jpg"
import HP from "../assets/HPPavilion.jpg"
import Lenevo from "../assets/Lenovo1.jpg"
import "../styles/Catalog.css";

const Catalog: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Apple MacBook Air M1",
      brand: "Apple",
      price: 74990,
      image: Apple,
    },
    {
      id: 2,
      name: "ASUS TUF Gaming F15",
      brand: "ASUS",
      price: 58990,
      image: Asus,
    },
    {
      id: 3,
      name: "Lenovo IdeaPad 5",
      brand: "Lenovo",
      price: 42990,
      image: Lenevo,
    },
    {
      id: 4,
      name: "HP Pavilion 15",
      brand: "HP",
      price: 39990,
      image: HP,
    },
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

      {/* Фильтр жана издөө контролдору */}
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
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Сорттоо</option>
          <option value="asc">Баасы (арзан → кымбат)</option>
          <option value="desc">Баасы (кымбат → арзан)</option>
        </select>
      </div>

      {/* Товарлар */}
      <div className="catalog-grid">
        {filtered.length === 0 ? (
          <p>Товар табылган жок.</p>
        ) : (
          filtered.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price.toLocaleString()} сом</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Catalog;
