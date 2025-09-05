// src/pages/Checkout.tsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !address) {
      alert("Бардык талааларды толтуруңуз!");
      return;
    }

    const orderDetails = cart
      .map(
        (item) =>
          `${item.name} - ${item.quantity} даана × ${item.price.toLocaleString()} сом`
      )
      .join("%0A");

    const message = `🛒 Жаңы заказ:%0A
👤 Кардар: ${name}%0A
📞 Телефон: ${phone}%0A
📍 Дарек: ${address}%0A
%0A📦 Товары:%0A${orderDetails}%0A
💰 Жалпы сумма: ${total.toLocaleString()} сом`;

    // 👉 Өзүңдүн WhatsApp номерди ушул жерге кой
    const whatsappNumber = "996702952200";

    // WhatsApp ачуу
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

    // Себетти тазалоо
    clearCart();

    // Success барагына багыттоо
    navigate("/success");
  };

  return (
    <div className="checkout">
      <h1>Заказ кылуу</h1>
      <h3>Жалпы сумма: {total.toLocaleString()} сом</h3>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Аты-жөнү:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Телефон:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+996 700 123 456"
            required
          />
        </label>

        <label>
          Дарек:
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="checkout-btn">
          📦 WhatsApp аркылуу заказ берүү
        </button>
      </form>
    </div>
  );
};

export default Checkout;
