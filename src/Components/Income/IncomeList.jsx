import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

const IncomeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const currency = "INR";

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const response = await axiosInstance.get("/income/income/");
      setIncomes(response.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim().length > 0) {
      const results = incomes.filter(
        (income) =>
          income.description.toLowerCase().includes(value) ||
          income.source_name.toLowerCase().includes(value)
      );
      setFilteredIncomes(results);
    } else {
      setFilteredIncomes([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      try {
        await axiosInstance.delete(`/income/income/${id}/`);
        setIncomes(incomes.filter((income) => income.id !== id));
      } catch (error) {
        console.error("Error deleting income:", error);
      }
    }
  };

  const displayedIncomes = searchTerm ? filteredIncomes : incomes;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-10 bg-light">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item mt-2">
                <Link to="/income">Income</Link>
              </li>
              <li className="breadcrumb-item active mt-2" aria-current="page">
                My Income
              </li>
            </ol>
          </nav>
        </div>
        <div className="col-md-2">
          <Link to="/income/add" className="btn btn-primary">Add Income</Link>
        </div>
      </div>

      <div className="form-group mt-3 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search by description or source"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Amount ({currency})</th>
            <th>Source</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedIncomes.length > 0 ? (
            displayedIncomes.map((income) => (
              <tr key={income.id}>
                <td>{income.amount}</td>
                <td>{income.source_name}</td>
                <td>{income.description}</td>
                <td>{income.date}</td>
                <td>
                  <Link to={`/income/edit/${income.id}`} className="btn btn-secondary btn-sm me-2">Edit</Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(income.id)}>Delete</button>
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

export default IncomeList;