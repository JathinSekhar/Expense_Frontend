import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaHome,
  FaMoneyBillWave,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaBell,
  FaUser,
} from "react-icons/fa";
import "./SetBudget.css";

function SetBudget() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [fullName, setFullName] = useState("User");
  const email = "nerellajathin2006@gmail.com";

  const [totalBudget, setTotalBudget] = useState(2000);
  const [categories, setCategories] = useState([
    { name: "🚗 Transport", budget: 300 },
    { name: "🛒 Groceries", budget: 400 },
    { name: "🎬 Entertainment", budget: 300 },
    { name: "💡 Utilities", budget: 200 },
    { name: "🍽️ Food", budget: 300 },
    { name: "🛍️ Shopping", budget: 200 },
    { name: "💊 Health", budget: 100 },
    { name: "✈️ Travel", budget: 300 },
  ]);

  const [duration, setDuration] = useState("Monthly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [repeat, setRepeat] = useState(false);
  const [alerts, setAlerts] = useState({ 80: false, 90: false, 100: false });
  const [goal, setGoal] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetch("http://localhost:2544/user/getfullname", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csrid: token }),
      })
        .then((res) => res.text())
        .then((data) => {
          if (data.startsWith("200::")) {
            setFullName(data.split("200::")[1]);
          }
        })
        .catch((err) => console.error("Error fetching full name:", err));

      fetch(`http://localhost:2544/user/transactions/${email}`)
        .then((res) => res.json())
        .then((data) => setExpenses(data))
        .catch((err) => console.error("Error fetching transactions:", err));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (index, value) => {
    const newValue = parseInt(value) || 0;
    const newCategories = [...categories];
    newCategories[index].budget = newValue;

    const totalAllocated = newCategories.reduce((acc, cat) => acc + cat.budget, 0);
    if (totalAllocated > totalBudget) {
      alert("⚠️ Total category budgets exceed overall budget!");
      return;
    }

    setCategories(newCategories);
  };

  const handleAlertChange = (level) => {
    setAlerts((prev) => ({ ...prev, [level]: !prev[level] }));
  };

  const handleSave = () => {
    alert("✅ Budget saved successfully!");
  };

  return (
    <div className="layout">
      <aside
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        <button className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <FaBars />
        </button>
        <nav className="nav-menu">
          <Link to="/dashboard" className="nav-item">
            <div className="icons"><FaHome /></div>
            <span>Home</span>
          </Link>
          <Link to="/transaction" className="nav-item">
            <div className="icons"><FaMoneyBillWave /></div>
            <span>Expenses</span>
          </Link>
          <Link to="/setbudget" className="nav-item">
            <div className="icons"><FaChartLine /></div>
            <span>Set Budget</span>
          </Link>
          <a href="#" className="nav-item">
            <div className="icons"><FaCog /></div>
            <span>AI Insights</span>
          </a>
          <a href="#" className="nav-item">
            <div className="icons"><FaCog /></div>
            <span>Settings</span>
          </a>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <div className="icons"><FaSignOutAlt /></div>
          <span>Logout</span>
        </button>
      </aside>

      <main className="content">
        <header className="header">
          <h1>Expense Buddy</h1>
          <div className="header-right">
            <FaBell className="icon" />
            <div className="profile">
              <FaUser className="icon" />
              <span>{fullName}</span>
            </div>
          </div>
        </header>

        <div className="set-budget-page">
          <h1>Set Your Budget</h1>

          <div className="total-budget-section">
            <label>Total Budget (₹):</label>
            <input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="budget-options">
           

            <label>Start Date 📅</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

           
              
                <label>End Date 📆</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              
            

            <label>Alerts 🔔</label>
            <div className="alerts">
              {[80, 90, 100].map((level) => (
                <label key={level}>
                  <input
                    type="checkbox"
                    checked={alerts[level]}
                    onChange={() => handleAlertChange(level)}
                  />
                  {level}%
                </label>
              ))}
            </div>

            <label>Set Goal 🎯</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Save ₹5000 this month"
            />
          </div>

          <h2>Category-wise Allocation 📂</h2>
          <div className="category-grid">
            {categories.map((cat, index) => (
              <div className="category-row" key={index}>
                <label>{cat.name}</label>
                <input
                  type="number"
                  value={cat.budget}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>

          <button className="save-btn" onClick={handleSave}>
            Save Budget
          </button>
        </div>
      </main>
    </div>
  );
}

export default SetBudget;
