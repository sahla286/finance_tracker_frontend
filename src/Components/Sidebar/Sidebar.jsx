import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home } from "react-feather";

const Sidebar = () => {
  const [username, setUsername] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear(); 
      navigate("/login"); 
      window.location.reload(); 
    }
  };

  return (
    <div className="d-flex">
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm px-3">
        <div className="container-fluid d-flex justify-content-between">
          <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">
            ExpenseTracker
          </Link>

          <div className="d-flex align-items-center">
            <span className="me-3 fw-bold">({username || "Guest"})</span>
            <button onClick={handleLogout} className="btn btn-outline-dark">
              <i className="fa-solid fa-right-from-bracket me-2"></i> Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="d-flex" style={{ marginTop: "56px", width: "250px", height: "100vh", position: "fixed", background: "#f8f9fa", padding: "10px" }}>
        <div className="flex-grow-1">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                <Home size={16} className="me-2" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/expenses">Expenses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/income">Incomes</Link>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Summary</span>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <Link className="nav-link" to="/expenses-chart">Expenses Summary</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/income-chart">Income Summary</Link>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Settings</span>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <Link className="nav-link" to="/preferences">General</Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" to="#">Account</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

