import React from 'react'
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="fade-in">
      <header >
      <div className="container">
        
        <nav className="navbar">
        <h1><Link to="/">Expense Buddy</Link></h1>
          <ul className="nav-links">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="main-section">
          <div className='container'>
             <h2>Track Your Finances with AI</h2>
             <p>Manage your expenses and savings efficiently with our smart finance tracker.</p>
                 <div className="buttons">
                     <Link to="/register" className="btn">Get Started</Link>
                     <Link to="/login" className="btn btn-secondary">Login</Link>
                 </div>
           </div>
        </section>


        <section id="features" className="features">
            <div className="container">
                <h2>Benefits</h2>
                <div className="feature-list">
                    <div className="feature-item">
                        <i className="fas fa-chart-line"></i>
                        <h3>Track Expenses</h3>
                        <p>Easily categorize and monitor your expenses.</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-lightbulb"></i>
                        <h3>AI Insights</h3>
                        <p>Get personalized financial insights and predictions.</p>
                    </div>
                    <div className="feature-item">
                        <i className="fas fa-wallet"></i>
                        <h3>Budget Management</h3>
                        <p>Set budgets and receive alerts to stay on track.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <footer>
        <div className="social-media">
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
        </div>
        
        <div className="container">
            <p>&copy; 2024 AI Finance Tracker. All rights reserved.</p>
        </div>
    </footer>

    </div>
  )
}

export default App