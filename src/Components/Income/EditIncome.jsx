import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditIncome = ({ sources = [], getIncomeById, updateIncome, deleteIncome }) => {
  const { id } = useParams(); // Get the income ID from URL
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    source: "",
    income_date: "",
  });

  // Fetch income details when component mounts
  useEffect(() => {
    const fetchIncome = async () => {
      const income = await getIncomeById(id);
      if (income) {
        setFormData({
          amount: income.amount || "",
          description: income.description || "",
          source: income.source || "",
          income_date: income.income_date ? income.income_date.split("T")[0] : "",
        });
      }
    };
    fetchIncome();
  }, [id, getIncomeById]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateIncome(id, formData);
    navigate("/income"); // Redirect after successful update
  };

  // Handle delete action
//   const handleDelete = async () => {
//     if (window.confirm("Are you sure you want to delete this income record?")) {
//       await deleteIncome(id);
//       navigate("/income");
//     }
//   };

  return (
    <div className="container mt-4">
      {/* Breadcrumb Navigation */}
      <div className="row">
        <div className="col-md-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-light p-3 rounded">
              <li className="breadcrumb-item">
                <a href="/income">Income</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Edit Income
              </li>
            </ol>
          </nav>


        </div>
        {/* <div className="col-md-2 text-end">
          <button className="btn btn-danger btn-sm" onClick={handleDelete}>
            Delete
          </button>
        </div> */}
      </div>

      {/* Edit Income Form */}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            {/* <div className="card-header bg-primary text-white text-center">
              <h5 className="mb-0">Edit Income</h5>
            </div> */}
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

                {/* Source Dropdown */}
                <div className="mb-3">
                  <label className="form-label">Source</label>
                  <select
                    className="form-select"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a source</option>
                    {sources.map((source, index) => (
                      <option key={index} value={source.name}>
                        {source.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Picker */}
                <div className="mb-3">
                  <label className="form-label">Date of Income</label>
                  <input
                    type="date"
                    className="form-control"
                    name="income_date"
                    value={formData.income_date}
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

          {/* Back to Income List Button */}
          {/* <div className="text-center mt-3">
            <a href="/income" className="btn btn-secondary">
              Back to Income List
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default EditIncome;
