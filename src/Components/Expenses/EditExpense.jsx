import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

const EditExpense = () => {
  const { id } = useParams(); // Get the expense ID from URL
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
  });
  const [categories, setCategories] = useState([]);

  // Fetch categories from backend
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

  // Fetch expense details when component mounts
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await axiosInstance.get(`/expense/expenses/${id}/`);
        const expense = response.data;
        setFormData({
          amount: expense.amount,
          description: expense.description,
          category: expense.category,
          date: expense.date,
        });
      } catch (error) {
        console.error("Error fetching expense:", error);
      }
    };
    fetchExpense();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/expense/expenses/${id}/`, formData);
      alert("Expense updated successfully!");
      navigate("/expenses"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("Failed to update expense");
    }
  };

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light p-3 rounded">
          <li className="breadcrumb-item">
            <a href="/expenses">Expenses</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Expense
          </li>
        </ol>
      </nav>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-3 text-center">Edit Expense</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Date of Expense</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-100">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
