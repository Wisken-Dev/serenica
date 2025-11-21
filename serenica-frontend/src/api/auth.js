import axios from "axios";
import { jwtDecode } from "jwt-decode"; // optional but helpful for extracting user info

// ✅ Backend API base URL
const API_URL = "http://localhost:5000/api/auth";

// ✅ Axios instance with common settings
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false, // set true only if backend uses cookies
});

// 🟢 SIGNUP
export const signup = async (userData) => {
  try {
    console.log("📤 Sending signup data:", userData);
    const res = await api.post("/signup", userData);
    console.log("✅ Signup response:", res.data);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    console.error("❌ Signup error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Signup failed" };
  }
};

// 🔵 LOGIN
export const login = async (credentials) => {
  try {
    console.log("📤 Sending login credentials:", credentials);
    const res = await api.post("/login", credentials);
    console.log("✅ Login response:", res.data);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};

// 🟣 LOGOUT
export const logout = () => {
  console.log("🚪 Logging out and removing token");
  localStorage.removeItem("token");
};

// 🟡 GET CURRENT USER (from localStorage)
export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log("👤 Decoded user from token:", decoded);
    return { token, user: decoded };
  } catch (error) {
    console.error("⚠️ Invalid or expired token:", error);
    localStorage.removeItem("token");
    return null;
  }
};
