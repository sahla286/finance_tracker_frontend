import React, { useState } from 'react';
import { registrationApi } from '../../services/allapis';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
  
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
  
    try {
      const data = { username, email, password };
      const response = await registrationApi(data);
  
      if (response.status === 201) {
        setSuccessMessage(response.data.message || "Account created successfully. Check your email for activation.");
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setErrorMessage(response.data?.message || "Something went wrong, please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
  
      if (error.response) {
        setErrorMessage(error.response.data?.message || "Something went wrong, please try again.");
      } else {
        setErrorMessage("Network error. Please check your internet connection.");
      }
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-4">
        <div className="card shadow p-4">
          <div className="card-body">
            <h4 className="text-center mb-3">Register for a free account</h4>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>

            <div className="text-center mt-3">
              <p>Already have an account? <a href="/login">Login</a></p>
              <p><a href="/request-reset-email">Forgot Password?</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
