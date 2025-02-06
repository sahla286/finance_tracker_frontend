import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";


const LandingPage = () => {
  return (
    <div>
     
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mt-0">
        <div className="container">
          <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">
            ExpenseTracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="btn btn-outline-primary me-2 px-4" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-primary px-4" to="/register">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <header className="hero-section text-white text-center py-5 bg-primary">
        <div className="container">
          <h1 className="display-4 fw-bold">Take Control of Your Finances</h1>
          <p className="lead">
            Track your spending, manage your budget, and gain financial freedom.
          </p>
          <Link className="btn btn-light btn-lg mt-3 fw-bold" to="/register">
            Get Started
          </Link>
        </div>
      </header>

  
      <section className="container my-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card feature-card text-center p-4">
              <div className="icon-box">
                <i className="bi bi-graph-up"></i>
              </div>
              <h3 className="mt-3">See where you spend the most</h3>
              <p>
                Get real-time categorization of your expenses so you know where your
                money goes every month.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card feature-card text-center p-4">
              <div className="icon-box">
                <i className="bi bi-wallet2"></i>
              </div>
              <h3 className="mt-3">Keep tabs on your money</h3>
              <p>
                Connect all your accounts and track everything from a single dashboard.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card feature-card text-center p-4">
              <div className="icon-box">
                <i className="bi bi-pie-chart"></i>
              </div>
              <h3 className="mt-3">Track your monthly spending</h3>
              <p>
                Set budgets, monitor trends, and get insights into your financial habits.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-light text-center py-3">
        <p>&copy; 2025 ExpenseTracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
