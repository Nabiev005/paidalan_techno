// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile"; 
import AdminPanel from "./pages/AdminPanel"; 

import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

// 🔒 Корголгон маршрут
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Жүктөлүп жатат...</p>;

  return user ? <>{children}</> : <Navigate to="/" />;
};

// 🔑 Админ маршрут
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, isAdmin } = useAuth();

  if (loading) return <p>Жүктөлүп жатат...</p>;

  return isAdmin ? <>{children}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/success" element={<Success />} />
                <Route path="/about" element={<About />} />
                <Route path="/favorites" element={<Favorites />} />

                {/* 👤 Профиль */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* 👑 Админ панель */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminPanel />
                    </AdminRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />

            {/* 🔔 Toast контейнер */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          </div>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
