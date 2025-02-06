import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/authentication/request-reset-email/",
        { email }
      );
      toast.success("A reset link has been sent to your email. Please check your inbox.");

      setSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-center py-2">
              Please enter your email to get a reset link
            </h4>

            {submitted ? (
              <div className="alert alert-success text-center">
                A password reset link has been sent to <b>{email}</b>.
                <br />
                Please check your inbox and follow the instructions.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>
                </div>
              </form>
            )}

            <div className="text-center mt-3">
              <p>
                Have an account? <a href="/login">Login</a>
              </p>
              <p>
                Don't have an account? <a href="/register">Register Here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
