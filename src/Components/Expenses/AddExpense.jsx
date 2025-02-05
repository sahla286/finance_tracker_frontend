import { useState, useEffect } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
  });
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // ✅ Fetch categories from backend
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await axiosInstance.get("/expense/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    loadCategories();
  }, []);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting Expense:", formData); // ✅ Debugging Log

    try {
        const response = await axiosInstance.post("/expense/expenses/", formData);
        alert("Expense added successfully!");
        navigate("/expenses");
        setFormData({ amount: "", description: "", category: "", date: "" });
    } catch (error) {
        console.error("Error adding expense:", error.response?.data || error.message);
        alert("Failed to add expense: " + JSON.stringify(error.response?.data || error.message));
    }
  };

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light p-3 rounded">
          <li className="breadcrumb-item"><a href="/expenses">Expenses</a></li>
          <li className="breadcrumb-item active" aria-current="page">Add Expense</li>
        </ol>
      </nav>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-3 text-center">Add New Expense</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" >Amount</label>
                  <input type="number" placeholder="Enter Amount" className="form-control" name="amount" value={formData.amount} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" placeholder="Enter Description" name="description" value={formData.description} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select className="form-select" name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">Select a category</option>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))
                    ) : (
                      <option disabled>No categories available</option>
                    )}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Date of Expense</label>
                  <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-100">Submit Expense</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
