// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken, logout } from "../api/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch logged-in user info from token
  useEffect(() => {
    const fetchUser = async () => {
      const loggedUser = await getUserFromToken();
      setUser(loggedUser);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo192.png"
            alt="Serenica Logo"
            className="w-8 h-8"
          />
          <span className="text-lg font-bold text-blue-700">
            Serenica Health Africa
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-600">
            About
          </Link>
          <Link to="/journal" className="hover:text-blue-600">
            Journal
          </Link>
          <Link to="/therapists" className="hover:text-blue-600">
            Therapists
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-3 items-center">
          {user ? (
            <>
              <span className="text-sm text-gray-600">
                Hi, {user.name || "User"}
              </span>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
