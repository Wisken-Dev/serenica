import React, { useState, useEffect } from "react";
import { signup } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = ({ setUser, language, t }) => {
  // ✅ Change "name" to "username" in the form state
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState("checking");
  const [backendUrl, setBackendUrl] = useState("");
  const navigate = useNavigate();

  // Determine backend URL based on environment
  useEffect(() => {
    const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';
    const url = isDevelopment 
      ? "http://localhost:5000" 
      : "https://serenica-backend.vercel.app";
    
    setBackendUrl(url);
    console.log(`🌐 Using backend: ${url}`);
  }, []);

  // Test backend connection
  useEffect(() => {
    if (!backendUrl) return;

    axios
      .get(`${backendUrl}/api/auth/test`)
      .then((res) => {
        console.log("Backend connected ✅", res.data);
        setBackendStatus("connected");
      })
      .catch((err) => {
        console.error("Backend connection failed ❌", err);
        setBackendStatus("failed");
        
        // If production fails, try localhost as fallback (for development)
        if (backendUrl.includes("vercel.app")) {
          console.log("🔄 Trying localhost as fallback...");
          axios.get("http://localhost:5000/api/auth/test")
            .then((res) => {
              console.log("Local backend connected ✅", res.data);
              setBackendUrl("http://localhost:5000");
              setBackendStatus("connected");
            })
            .catch(() => {
              // Both failed, keep production URL but mark as failed
              setBackendStatus("failed");
            });
        }
      });
  }, [backendUrl]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // ✅ Send the form data directly - it now has "username" instead of "name"
      const res = await signup(form, backendUrl);

      // ✅ Save user info correctly based on backend response
      const userData = {
        id: res.user?.id || res._id,
        username: res.user?.username || form.username, // ✅ Use username
        email: res.user?.email || form.email,
        token: res.token,
      };
      
      setUser(userData);

      // Save token and user data to localStorage
      if (res.token) {
        localStorage.setItem("token", res.token);
      }
      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ Redirect to dashboard
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
        {/* Backend Connection Status */}
        {backendStatus === "checking" && (
          <div style={{ 
            textAlign: "center",
            marginBottom: "var(--space-4)",
            padding: "var(--space-3)",
            backgroundColor: "var(--warning)", 
            color: "white", 
            borderRadius: "var(--radius)",
            fontSize: "var(--text-sm)"
          }}>
            🔄 Checking Backend Connection...
          </div>
        )}
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
            ✅ Backend Connected ({backendUrl.includes('localhost') ? 'Local' : 'Production'})
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
            <div style={{ fontSize: "var(--text-xs)", opacity: 0.8, marginTop: "4px" }}>
              {backendUrl}
            </div>
          </div>
        )}

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
          {/* ✅ Changed from "name" to "username" */}
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              name="username"  {/* ✅ Changed from "name" to "username" */}
              type="text"
              placeholder="Choose a username"
              className="form-input"
              value={form.username}
              onChange={handleChange}
              required
              disabled={isLoading || backendStatus === "failed"}
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
              disabled={isLoading || backendStatus === "failed"}
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
              disabled={isLoading || backendStatus === "failed"}
            />
          </div>
          
          <div style={{ display: "flex", gap: "var(--space-4)", justifyContent: "flex-end", flexWrap: "wrap" }}>
            <button
              type="submit"
              className="btn btn-therapy"
              style={{ width: "100%" }}
              disabled={isLoading || backendStatus === "failed"}
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

        {/* Debug info - remove in production */}
        {import.meta.env.DEV && (
          <div style={{ 
            marginTop: "var(--space-4)", 
            padding: "var(--space-3)", 
            backgroundColor: "var(--gray-100)", 
            borderRadius: "var(--radius)",
            fontSize: "var(--text-xs)",
            color: "var(--gray-600)"
          }}>
            <strong>Debug Info:</strong><br />
            Backend URL: {backendUrl}<br />
            Form Data: {JSON.stringify(form)}<br />
            Environment: {import.meta.env.DEV ? 'Development' : 'Production'}<br />
            Hostname: {window.location.hostname}
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;