import React, { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

const Signup = ({ setUser, language, t }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await signup(form);

      // ✅ Save user info correctly based on backend response
      const userData = {
        id: res._id,
        name: res.name,
        email: res.email,
        token: res.token,
      };
      setUser(userData);

      // Optional: persist in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ Redirect to dashboard instead of therapists
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="therapy-card" style={{ maxWidth: "400px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-6)" }}>
          <h2 style={{ 
            fontSize: "var(--text-2xl)", 
            fontWeight: "700", 
            color: "var(--therapy-primary)",
            marginBottom: "var(--space-2)"
          }}>
            Join Serenica
          </h2>
          <p style={{ 
            fontSize: "var(--text-base)", 
            color: "var(--gray-600)" 
          }}>
            Create your account to get started
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="form-input"
              value={form.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Create a password"
              className="form-input"
              value={form.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>
          
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "flex-end", flexWrap: "wrap" }}>
            <button
              type="submit"
              className="btn btn-therapy"
              style={{ width: "100%" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-small"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        <div style={{ textAlign: "center", marginTop: "var(--space-6)" }}>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--gray-600)" }}>
            Already have an account?{' '}
            <Link 
              to="/login" 
              style={{ 
                color: "var(--therapy-primary)", 
                textDecoration: "none",
                fontWeight: "600"
              }}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;