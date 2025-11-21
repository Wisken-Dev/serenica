import React, { useState, useEffect } from "react";
import { login } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [backendStatus, setBackendStatus] = useState("checking");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/test")
      .then((res) => {
        console.log("Backend connected ✅", res.data);
        setBackendStatus("connected");
      })
      .catch((err) => {
        console.error("Backend connection failed ❌", err);
        setBackendStatus("failed");
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await login({ email, password });
      console.log("Login response:", res);

      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      setUser(res.user || { token: res.token });

      // ✅ Redirect to dashboard instead of therapists
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Check credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="therapy-card" style={{ maxWidth: "400px", margin: "2rem auto" }}>
        {/* Backend Connection Status */}
        {backendStatus === "connected" && (
          <div style={{ 
            textAlign: "center",
            marginBottom: "var(--space-4)",
            padding: "var(--space-3)",
            backgroundColor: "var(--therapy-secondary)", 
            color: "white", 
            borderRadius: "var(--radius)",
            fontSize: "var(--text-sm)"
          }}>
            ✅ Backend Connected
          </div>
        )}
        {backendStatus === "failed" && (
          <div style={{ 
            textAlign: "center",
            marginBottom: "var(--space-4)",
            padding: "var(--space-3)",
            backgroundColor: "var(--danger)", 
            color: "white", 
            borderRadius: "var(--radius)",
            fontSize: "var(--text-sm)"
          }}>
            ❌ Backend Connection Failed
          </div>
        )}

        <div style={{ textAlign: "center", marginBottom: "var(--space-6)" }}>
          <h2 style={{ 
            fontSize: "var(--text-2xl)", 
            fontWeight: "700", 
            color: "var(--therapy-primary)",
            marginBottom: "var(--space-2)"
          }}>
            Welcome to Serenica
          </h2>
          <p style={{ 
            fontSize: "var(--text-base)", 
            color: "var(--gray-600)" 
          }}>
            Sign in to your account
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        <div style={{ textAlign: "center", marginTop: "var(--space-6)" }}>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--gray-600)" }}>
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              style={{ 
                color: "var(--therapy-primary)", 
                textDecoration: "none",
                fontWeight: "600"
              }}
              onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.target.style.textDecoration = 'none'}
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;