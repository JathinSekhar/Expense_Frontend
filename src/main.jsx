import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forget";          // fixed
import Dashboard from "./Dashboard.jsx";
import ResetPassword from "./pages/Resetpassword.jsx";

import Expense from "./DashPage/Expense";
import Transaction from "./DashPage/Transaction";
import SetBudget from "./DashPage/SetBudget";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forgot />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/setbudget" element={<SetBudget />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
