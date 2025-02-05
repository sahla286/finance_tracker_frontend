import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, FileText } from "react-feather";

const Sidebar = () => {
  const [username, setUsername] = useState(""); // State to store username
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Set the correct username
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token"); // Clear token
      localStorage.removeItem("username"); // Clear username
      navigate("/login"); // Redirect to login page
    }
  };

  return (
    <div>
      <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky pt-3">
          {/* Display the correct username */}
          <div className="nav-item text-nowrap">
            <span className="nav-link">({username || "Guest"})</span>
          </div>
          <div className="nav-item text-nowrap ml-2 bg-dark">
            <button onClick={handleLogout} className="btn btn-link text-white text-decoration-none">
              Sign out
            </button>
          </div>
          
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
              <Link className="nav-link" to="/income">Income</Link>
            </li>
          </ul>

          {/* Summary Section */}
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Summary</span>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <Link className="nav-link" to="/stats">
                <FileText size={16} className="me-2" />
                Expenses Summary
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/income-stats">
                <FileText size={16} className="me-2" />
                Income Summary
              </Link>
            </li>
          </ul>

          {/* Settings Section */}
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Settings</span>
          </h6>
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <Link className="nav-link" to="/preferences">General</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Account</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
