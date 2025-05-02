import React, { useState } from 'react';
import './login.css';

const Login = ({ onLoginSuccess, onSwitchToSignup }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogin = e => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (
            storedUser &&
            formData.email === storedUser.email &&
            formData.password === storedUser.password
        ) {
            localStorage.setItem('currentUser', JSON.stringify({ email: formData.email }));
            alert('Login successful!');
            onLoginSuccess();
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <img/>
            </div>
            <div className="login-right">
                <form className="login-form" onSubmit={handleLogin}>
                    <h2 className="login-title">LOGIN</h2>
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
                        <i
                            className="fa fa-eye login-password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={0}
                        ></i>
                    </div>
                    <div className="login-options">
                        <label className="login-remember">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            Remember Me
                        </label>
                        <a href="#" className="login-forgot">FORGOT PASSWORD ?</a>
                    </div>
                    <button type="submit" className="login-btn">LOGIN</button>
                    <div className="login-register">
                        <span>Don't have an account? </span>
                        <button type="button" className="login-link" onClick={onSwitchToSignup}>Register Here</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
