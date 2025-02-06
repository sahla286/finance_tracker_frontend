import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

const ExpenseList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const currency = "INR";

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axiosInstance.get("/expense/expenses/");
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };


  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim().length > 0) {
      const results = expenses.filter(
        (expense) =>
          expense.description.toLowerCase().includes(value) ||
          expense.category_name.toLowerCase().includes(value) 
      );
      setFilteredExpenses(results);
    } else {
      setFilteredExpenses([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await axiosInstance.delete(`/expense/expenses/${id}/`);
        setExpenses(expenses.filter((expense) => expense.id !== id));
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  const displayedExpenses = searchTerm ? filteredExpenses : expenses;

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <div className="row">
        <div className="col-md-10 bg-light">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item mt-2">
                <Link to="/expenses">Expenses</Link>
              </li>
              <li className="breadcrumb-item active mt-2" aria-current="page">
                My Expenses
              </li>
            </ol>
          </nav>
        </div>
        <div className="col-md-2">
          <Link to="/expenses/add" className="btn btn-primary">Add Expense</Link>
        </div>
      </div>

      <div className="form-group mt-3 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search by description or category"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Amount ({currency})</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedExpenses.length > 0 ? (
            displayedExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.amount}</td>
                <td>{expense.category_name}</td>
                <td>{expense.description}</td>
                <td>{expense.date}</td>
                <td>
                  <Link to={`/expenses/edit/${expense.id}`} className="btn btn-secondary btn-sm me-2">Edit</Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(expense.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
