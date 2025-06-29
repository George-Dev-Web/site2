// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "../services/api"; // Ensure this path is correct for your axios instance
import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import "../styles/pages/Login.css"; // Ensure path is correct

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth(); // Get the login function from AuthContext

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const res = await axios.post("/auth/login", formData);
      const token = res.data.token;

      if (token) {
        login(token); // Call the login function from context, which handles state update and redirection
      } else {
        setError("No token received from the server.");
      }
    } catch (err) {
      console.error("Login error:", err); // Log the full error
      // Check for specific error responses from Flask
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-text">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
