import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./Login.css";

const BASE_URL = "http://localhost:8080/myEB";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Auto-redirect if already logged in & token is valid
  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");

    if (token && expiresAt) {
      const now = new Date().getTime();
      if (now < parseInt(expiresAt)) {
        navigate("/dashboard");
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("expiresAt");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/user/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const resultText = await response.text();
      const [status, token] = resultText.split("::"); // If backend returns 200::<token>

      if (status === "200") {
        // Decode JWT to verify
        try {
          const decoded = jwtDecode(token);
          console.log("Logged in user:", decoded);
        } catch {
          console.warn("Invalid JWT received.");
        }

        const expiresAt = new Date().getTime() + 5 * 60 * 60 * 1000; // 5 hours
        localStorage.setItem("token", token);
        localStorage.setItem("expiresAt", expiresAt);
        navigate("/dashboard");
      } else {
        setError("Invalid Credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header>
        <div className="container">
          <nav className="navbar">
            <h1><Link to="/">Expense Buddy</Link></h1>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="login-section">
        <div className="login-container">
          <h2>Welcome Back</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="form-footer">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
            <p><Link to="/forget">Forgot your password?</Link></p>
          </div>
        </div>
      </section>

      <footer>
        <div className="social-media">
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-linkedin"></i></a>
        </div>

        <div className="container">
          <p>&copy; 2024 AI Finance Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Login;
