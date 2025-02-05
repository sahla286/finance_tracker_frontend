import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const Layout = () => {
  const navigate = useNavigate();
  const username = "JohnDoe"; // Replace with actual user context/state

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Mock logout logic
      console.log("Logging out...");
      navigate("/login"); // Redirect to login after logout
    }
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">
          TrulyExpenses
        </Link>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-nav d-flex flex-row align-items-center">
          <div className="nav-item text-nowrap">
            <span className="nav-link">({username})</span>
          </div>
          <div className="nav-item text-nowrap ml-2">
            <button onClick={handleLogout} className="btn btn-link text-white text-decoration-none">
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <Outlet /> {/* This will render nested routes */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
