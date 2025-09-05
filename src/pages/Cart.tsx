import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page empty">
        <h2>🛒 Себетиңиз бош</h2>
        <Link to="/catalog" className="btn-primary">Каталогго өтүү</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Сиздин себетиңиз</h1>

      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-info">
              <h3>{item.name}</h3>
              <p>{item.price.toLocaleString()} сом</p>
              <p>Саны: {item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                ❌ Өчүрүү
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2>Жалпы: {totalPrice.toLocaleString()} сом</h2>
        <div className="cart-actions">
          <button className="clear-btn" onClick={clearCart}>🗑️ Себетти тазалоо</button>
          <button className="checkout-btn" onClick={() => navigate("/checkout")}>
            ✅ Заказ кылуу
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
