import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-hero">
      <div className="hero-overlay">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Paidalan_Techno
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          Эң жаңы жана мыкты ноутбуктарды таба аласыз 🚀
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <Link to="/catalog" className="btn-primary">Каталогго өтүү</Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
