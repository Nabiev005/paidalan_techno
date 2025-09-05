import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
// import Logo from "../assets/logo.png"
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="logo">
           <span className="logo-main">Paidalan</span>
           <span className="logo-sub">Techno</span>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Башкы бет</Link>
        <Link to="/catalog" onClick={() => setMenuOpen(false)}>Каталог</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>Биз жөнүндө</Link>
        <Link to="/cart" className="cart-link" onClick={() => setMenuOpen(false)}>
          🛒 Себет {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
      </div>

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
