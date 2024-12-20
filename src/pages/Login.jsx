import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
export default function Login() {
  const [formData, setFormData] = useState({
    emp_no: '',
    password: '',
    rememberMe: false
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emp_no: formData.emp_no,
          password: formData.password
        }),
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json();
        Cookies.set('data', data.user.role)
        const token = Cookies.get('token')
        console.log('token', token)
        console.log('Navigating to /dashboard');
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
    } else {
        alert('Authentication failed. Please check your emp_no and password.');
        
    }

    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="hotel-icon">🏨</div>
        <h1>Suites System Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emp_no">Employee Number</label>
            <input
              type="text"
              id="emp_no"
              name="emp_no"
              value={formData.emp_no}
              onChange={handleChange}
              placeholder="Enter your Employee Number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>

        <footer>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <span className="separator">·</span>
            <a href="/terms">Terms of Service</a>
          </div>
          <div className="copyright">
            © 2024 Epashikino Resort & Spa. All rights reserved.
          </div>
        </footer>
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f5f5f5;
          padding: 20px;
        }

        .login-box {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .hotel-icon {
          font-size: 48px;
          margin-bottom: 20px;
          color: #1a73e8;
        }

        h1 {
          font-size: 20px;
          color: #202124;
          margin-bottom: 30px;
          font-weight: 500;
        }

        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        label {
          display: block;
          margin-bottom: 8px;
          color: #5f6368;
          font-size: 14px;
        }

        input[type="text"],
        input[type="password"] {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #dadce0;
          border-radius: 4px;
          font-size: 14px;
          color: #202124;
          transition: border-color 0.2s;
        }

        input[type="text"]:focus,
        input[type="password"]:focus {
          border-color: #1a73e8;
          outline: none;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .remember-me label {
          margin-bottom: 0;
          cursor: pointer;
        }

        .login-button {
          width: 100%;
          padding: 12px;
          background-color: #1a73e8;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .login-button:hover {
          background-color: #1557b0;
        }

        .forgot-password {
          margin: 20px 0;
        }

        .forgot-password a {
          color: #1a73e8;
          text-decoration: none;
          font-size: 14px;
        }

        .forgot-password a:hover {
          text-decoration: underline;
        }

        .error-message {
          color: red;
          font-size: 14px;
          margin-top: 10px;
        }

        footer {
          margin-top: 40px;
          font-size: 12px;
          color: #5f6368;
        }

        .footer-links {
          margin-bottom: 10px;
        }

        .footer-links a {
          color: #5f6368;
          text-decoration: none;
        }

        .footer-links a:hover {
          text-decoration: underline;
        }

        .separator {
          margin: 0 8px;
        }

        .copyright {
          color: #5f6368;
        }
      `}</style>
    </div>
  )
}
