// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "../styles/components/Navbar.css";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <h1 className="navbar-title">SiteTask Tracker</h1>
      {isAuthenticated && (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Navbar;
