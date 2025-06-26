import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // 🔥 Flask backend base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Enable if using cookies/JWTs later
});

export default api;
