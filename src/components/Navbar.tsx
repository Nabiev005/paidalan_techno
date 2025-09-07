import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext"; // 🔥 Auth контекст
import { signInWithGoogle, logout } from "../firebase"; // 🔥 Firebase функциялары
import Note from "../assets/logo3.png";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const { user } = useAuth(); // 🔥 колдонуучу абалы
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavorites = favorites.length;

  return (
    <nav className="navbar">
      {/* Логотип */}
      <Link to="/" className="navbar-logo">
        <img src={Note} alt="Paidalan Techno" />
      </Link>

      {/* Навигация шилтемелери */}
      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Башкы бет</Link>
        <Link to="/catalog" onClick={() => setMenuOpen(false)}>Каталог</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>Биз жөнүндө</Link>

        {/* Сүйүктүүлөр */}
        <Link to="/favorites" className="fav-link" onClick={() => setMenuOpen(false)}>
          Сакталган товар
          {totalFavorites > 0 && <span className="fav-count">{totalFavorites}</span>}
        </Link>

        {/* Себет */}
        <Link to="/cart" className="cart-link" onClick={() => setMenuOpen(false)}>
          🛒 Себет
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>

        {/* 🔥 Кирүү / Чыгуу + Профиль */}
        <div className="auth-section">
          {user ? (
            <>
              <Link to="/profile" className="profile-link" onClick={() => setMenuOpen(false)}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "Profile"}
                    className="profile-avatar"
                  />
                ) : (
                  <span className="user-name">{user.displayName || "Профиль"}</span>
                )}
              </Link>
              <button className="auth-btn" onClick={logout}>
                Чыгуу
              </button>
            </>
          ) : (
            <button
                  className="auth-btn1"
                  onClick={async () => {
                    await signInWithGoogle();
                  }}
            >
  Google менен кирүү
</button>
          )}
        </div>
      </div>

      {/* Мобилдик меню (гамбургер) */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="bar top"></span>
        <span className="bar middle"></span>
        <span className="bar bottom"></span>
      </div>
    </nav>
  );
};

export default Navbar;
