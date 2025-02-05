import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditExpense = ({ categories = [], getExpenseById, updateExpense, deleteExpense }) => {
  const { id } = useParams(); // Get the expense ID from URL
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    expense_date: "",
  });

  // Fetch expense details when component mounts
  useEffect(() => {
    const fetchExpense = async () => {
      const expense = await getExpenseById(id);
      if (expense) {
        setFormData({
          amount: expense.amount || "",
          description: expense.description || "",
          category: expense.category || "",
          expense_date: expense.expense_date ? expense.expense_date.split("T")[0] : "",
        });
      }
    };
    fetchExpense();
  }, [id, getExpenseById]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateExpense(id, formData);
    navigate("/expenses"); // Redirect after successful update
  };

  return (
    <div className="container mt-4">
      {/* Breadcrumb Navigation */}
      <div className="row">
        <div className="col-md-12">
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
        </div>
      </div>

      {/* Edit Expense Form */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Amount Input */}
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

                {/* Description Input */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category Dropdown */}
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
                    {categories.map((category, index) => (
                      <option key={index} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Picker */}
                <div className="mb-3">
                  <label className="form-label">Date of Expense</label>
                  <input
                    type="date"
                    className="form-control"
                    name="expense_date"
                    value={formData.expense_date}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Save Button */}
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
