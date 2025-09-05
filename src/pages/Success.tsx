import React from "react";
import { Link } from "react-router-dom";
import "../styles/Success.css";

const Success: React.FC = () => {
  return (
    <div className="success-page">
      <div className="success-card">
        <div className="checkmark">✔</div>
        <h1>Заказ ийгиликтүү!</h1>
        <p>
          Рахмат 🙏. Биз сиз менен жакын арада байланышабыз. <br />
          Тандооңуз үчүн чоң рахмат!
        </p>
        <Link to="/catalog" className="btn-back">
          🛍 Дүкөнгө кайтуу
        </Link>
      </div>
    </div>
  );
};

export default Success;
