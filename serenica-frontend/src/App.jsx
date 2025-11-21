import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/HomePage";
import About from "./pages/About";
import Journal from "./pages/Journal";
import Therapists from "./pages/Therapists";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Auth helper
import { getCurrentUser } from "./api/auth";

// Import our custom CSS
import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);

  // Load user from localStorage (via token)
  useEffect(() => {
    const loggedInUser = getCurrentUser();
    if (loggedInUser) setUser(loggedInUser);
  }, []);

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app-container min-h-screen">
        <Navbar user={user} setUser={setUser} />

        <main className="main-content container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/journal" element={<Journal />} />
            <Route
              path="/therapists"
              element={
                <ProtectedRoute>
                  <Therapists />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;