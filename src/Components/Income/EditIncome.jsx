import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

const EditIncome = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    source: "",
    date: "",    
  });
  const [sources, setSources] = useState([]);

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

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const response = await axiosInstance.get(`/income/income/${id}/`);
        const income = response.data;
        setFormData({
          amount: income.amount,
          description: income.description,
          source: income.source,
          date: income.date,
        });
      } catch (error) {
        console.error("Error fetching income:", error);
      }
    };
    fetchIncome();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/income/income/${id}/`, formData);
      alert("Income updated successfully!");
      navigate("/income"); 
    } catch (error) {
      console.error("Error updating income:", error);
      alert("Failed to update income");
    }
  };

  return (
    <div className="container" style={{ marginTop: "80px" }}>
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

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-3 text-center">Edit Income</h4>
              <form onSubmit={handleSubmit}>
      

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
                  <label className="form-label">Source</label>
                  <select
                    className="form-select"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a source</option>
                    {sources.map((source) => (
                      <option key={source.id} value={source.id}>
                        {source.name}
                      </option>
                    ))}
                  </select>
                </div>
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
                  <label className="form-label">Date of Income</label>
                  <input
                    type="date"
                    className="form-control"
                    name="income_date"
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

export default EditIncome;
