import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CompletePasswordReset = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/authentication/reset-password/${uidb64}/${token}/`)
      .then((response) => {
        if (response.data.message) {
          setMessage("Token is valid. Please set a new password.");
        }
      })
      .catch(() => {
        setError("Invalid or expired token.");
      });
  }, [uidb64, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(
        `http://127.0.0.1:8000/authentication/reset-password/${uidb64}/${token}/`,
        { password, password2 }
      );

      setMessage("Password reset successfully! Please login.");
      
      setTimeout(() => navigate("/login"), 3000); 
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-center py-2">Set Your New Password</h4>

            {message && <div className="alert alert-success text-center">{message}</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <input
                  type="password"
                  name="password2"
                  placeholder="Confirm Password"
                  className="form-control"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-block">
                  Reset Password
                </button>
              </div>
            </form>

            <div className="text-center mt-3">
              <p>
                Have an account? <a href="/login">Login</a>
              </p>
              <p>
                No account? <a href="/register">Register Here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletePasswordReset;
