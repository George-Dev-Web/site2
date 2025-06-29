/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.js (or AuthContext.jsx)
import { createContext, useContext } from "react";

// Create the AuthContext
const AuthContext = createContext(null);

// Export the custom hook for consuming the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Explicitly export AuthContext here for AuthProvider.jsx to import
export { AuthContext };
