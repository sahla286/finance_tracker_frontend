import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const IncomeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const currency = "INR";
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/income") // Update with your actual API endpoint
      .then((res) => res.json())
      .then((data) => {
        setIncomes(data.results);
        setPagination({ currentPage: data.current_page, totalPages: data.total_pages });
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 0) {
      fetch("/income/search-income", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchText: value }),
      })
        .then((res) => res.json())
        .then((data) => setFilteredIncomes(data));
    } else {
      setFilteredIncomes([]);
    }
  };

  // ✅ Updated handleDelete function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this income record?")) {
      try {
        const response = await fetch(`/api/income/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setIncomes((prevIncomes) => prevIncomes.filter((income) => income.id !== id));
        } else {
          console.error("Failed to delete income record");
        }
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
          <Link to="/income/add" className="btn btn-primary">
            Add Income
          </Link>
        </div>
      </div>

      <div className="form-group mt-3 mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
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
                <td>{income.source}</td>
                <td>{income.description}</td>
                <td>{income.date}</td>
                <td>
                  <Link to={`/income/edit/${income.id}`} className="btn btn-secondary btn-sm me-2">
                    Edit
                  </Link>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(income.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {searchTerm === "" && (
        <div className="pagination-container">
          <p>
            Showing page {pagination.currentPage} of {pagination.totalPages}
          </p>
          <ul className="pagination">
            {pagination.currentPage > 1 && (
              <li className="page-item">
                <Link className="page-link" to={`?page=${pagination.currentPage - 1}`}>
                  Previous
                </Link>
              </li>
            )}
            {pagination.currentPage < pagination.totalPages && (
              <li className="page-item">
                <Link className="page-link" to={`?page=${pagination.currentPage + 1}`}>
                  Next
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IncomeList;
