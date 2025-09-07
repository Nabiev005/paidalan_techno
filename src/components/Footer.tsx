import React from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h3>Paidalan_Techno</h3>
          <p>Эң жаңы жана мыкты ноутбуктарды бизден таба аласыз 💻</p>
        </div>

        <div className="footer-links">
          <h4>Навигация</h4>
          <a href="/">Башкы бет</a>
          <a href="/catalog">Каталог</a>
          <a href="/about">Биз жөнүндө</a>
        </div>

        <div className="footer-contact">
          <h4>Байланыш</h4>
          <p>📍 Бишкек, Табышалиева 29</p>
          <p>📞 +996 553 230 804</p>
          <p>✉️ info@paidalan.kg</p>
        </div>

        <div className="footer-social">
          <h4>Биз менен байланыш</h4>
          <a href="https://www.facebook.com/?locale=ru_RU"><i className="fab fa-facebook"></i></a>
          <a href="https://www.instagram.com/paidalan_techno/">Instagram: <i className="fab fa-instagram">paidalan_techno</i></a>
          <a href=""><i className="fab fa-telegram"></i></a>
        </div>
      </div>

      <p className="footer-copy">© 2025 Paidalan_Techno. Бардык укуктар корголгон.</p>
    </footer>
  );
};

export default Footer;
