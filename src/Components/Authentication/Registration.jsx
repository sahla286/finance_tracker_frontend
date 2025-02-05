import React, { useState } from 'react';
import { registrationApi } from '../../services/allapis';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { username, email, password };
      const response = await registrationApi(data);

      if (response.status === 201) {
        setSuccessMessage(response.data.message); // Success message from the API response
      }
    } catch (error) {
      console.error('Error:', error);
      // Log the detailed error message from the backend
      setErrorMessage(error.response?.data?.message || 'Something went wrong, please try again later.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-md-4">
        <div className="card mt-4">
          <div className="card-body">
            <div className="card-title py-2 text-center">
              <h4>Register for a free account</h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-2">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>

              <div className="form-group mb-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>

              <div className="form-group position-relative mb-2">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-sm"
                />
              </div>

              <div className="d-grid">
                <input
                  type="submit"
                  value="Register"
                  className="btn btn-primary btn-block submit-btn"
                />
              </div>
            </form>
            <div className="container">
              <span className="text-lead lead">Have an account? </span>
              <a href="/login">Login</a>
              <br />
              <span className="text-lead lead">Forgot Password? </span>
              <a href="/request-reset-email">Reset it</a>
            </div>
          </div>
        </div>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Registration;
