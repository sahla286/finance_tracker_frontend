
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

const AddIncome = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    source: "",
    date: "",
  });
  const navigate = useNavigate();
  const [sources, setSources] = useState([]);

  // ✅ Fetch sources from backend
  useEffect(() => {
    const loadSources = async () => {
      try {
        const response = await axiosInstance.get("/income/sources/");
        setSources(response.data);
      } catch (error) {
        console.error("Error fetching sources:", error);
      }
    };
    loadSources();
  }, []);

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Income:", formData);

    try {
      const response = await axiosInstance.post("/income/income/", formData);
      alert("Income added successfully!");
      navigate("/income");
      setFormData({ amount: "", description: "", source: "", date: "" });
    } catch (error) {
      console.error("Error adding income:", error.response?.data || error.message);
      alert("Failed to add income: " + JSON.stringify(error.response?.data || error.message));
    }
  };

  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb bg-light p-3 rounded">
          <li className="breadcrumb-item"><a href="/income">Income</a></li>
          <li className="breadcrumb-item active" aria-current="page">Add Income</li>
        </ol>
      </nav>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-3 text-center">Add New Income</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <input type="number" className="form-control" placeholder="Enter Amount" name="amount" value={formData.amount} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" placeholder="Enter Description" name="description" value={formData.description} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Source</label>
                  <select className="form-select" name="source" value={formData.source} onChange={handleChange} required>
                    <option value="">Select a source</option>
                    {sources.length > 0 ? (
                      sources.map((source) => (
                        <option key={source.id} value={source.id}>{source.name}</option>
                      ))
                    ) : (
                      <option disabled>No sources available</option>
                    )}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Date of Income</label>
                  <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-100">Submit Income</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIncome;