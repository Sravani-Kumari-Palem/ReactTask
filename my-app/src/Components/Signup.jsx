// src/components/Signup.jsx
import React, { useState } from 'react';
import './login.css';
//import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    localStorage.setItem('user', JSON.stringify({ email: formData.email, password: formData.password }));
    alert('Signup successful!');
    onSwitchToLogin();
  };

  return (
    <div className="login-container">
      <div className="login-left">
        {/* Placeholder for image/design */}
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">SIGN UP</h2>
          <label className="login-label">EMAIL/PHONE NUMBER</label>
          <input
            className="login-input"
            name="email"
            type="email"
            placeholder="josh@gmail.com"
            onChange={handleChange}
            required
          />
          <label className="login-label">PASSWORD</label>
          <div className="login-password-wrapper">
            <input
              className="login-input"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              onChange={handleChange}
              required
            />
            <span
              className="login-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={0}
            >
              {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
            </span>
          </div>
          <label className="login-label">CONFIRM PASSWORD</label>
          <div className="login-password-wrapper">
            <input
              className="login-input"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="password"
              onChange={handleChange}
              required
            />
            <span
              className="login-password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={0}
            >
              {showConfirmPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
            </span>
          </div>
          <button type="submit" className="login-btn">SIGN UP</button>
          <div className="login-register">
            <button type="button" className="login-link" onClick={onSwitchToLogin}>
              Have an account already? Log in here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
