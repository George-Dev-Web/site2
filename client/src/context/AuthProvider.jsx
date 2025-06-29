import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const navigate = useNavigate(); // This is the source of the useNavigate error, we'll fix this below.

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/register"
      ) {
        // navigate("/dashboard", { replace: true }); // This line causes the useNavigate error
      }
    } else {
      localStorage.removeItem("token");
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register"
      ) {
        // navigate("/login", { replace: true }); // This line causes the useNavigate error
      }
    }
  }, [token /*, navigate */]); // navigate dependency is fine if it works

  const login = (newToken) => {
    setToken(newToken);
    navigate("/dashboard"); // This line also causes the useNavigate error
  };

  const logout = () => {
    setToken(null);
    navigate("/login"); // This line also causes the useNavigate error
  };

  const authContextValue = {
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
