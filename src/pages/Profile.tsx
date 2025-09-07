// src/pages/Profile.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { signInWithGoogle, logout } from "../firebase";
import "../styles/Profile.css";

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <h1>👤 Профиль</h1>

      {user ? (
        <div className="profile-card">
          <img
            src={user.photoURL || "https://via.placeholder.com/100"}
            alt={user.displayName || "User"}
            className="profile-avatar"
          />
          <h2>{user.displayName}</h2>
          <p>{user.email}</p>
          <button className="logout-btn" onClick={logout}>
            🚪 Чыгуу
          </button>
        </div>
      ) : (
        <div className="profile-card">
          <p>Кирүү үчүн Google аккаунтуңузду колдонуңуз.</p>
          <button className="login-btn" onClick={signInWithGoogle}>
            🔑 Google менен кирүү
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
