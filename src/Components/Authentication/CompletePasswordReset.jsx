import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { completePasswordResetApi } from '../../services/allapis';

const CompletePasswordReset = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/authentication/reset-password/${uidb64}/${token}/`)
      .then(response => {
        if (response.data.message) {
          setMessage('Token is valid');
        }
      })
      .catch(() => {
        setError('Invalid or expired token');
      });
  }, [uidb64, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }

    try {
      await completePasswordResetApi(uidb64, token, password, password2);
      setMessage('Password has been reset successfully');
      navigate('/login');
    } catch (error) {
      setError('Error resetting password');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default CompletePasswordReset;
