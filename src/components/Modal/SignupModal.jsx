import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function SignupModal({ onClose, setUserToken, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    function handleEsc(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);


  function handleOverlayClick(event) {
    if (event.target.classList.contains('modal-overlay')) {
      onClose();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let newErrors = {};
    if (!username) newErrors.username = "Username required";
    if (!email) newErrors.email = "Email required";
    if (!password) newErrors.password = "Password required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    setErrors({});
    try {
      const response = await axios.post(`${API_URL}/user/signup`, {
        username,
        email,
        password
      });
      setLoading(false);
      setSuccess(true);
      if (response.data.token) {
        setUserToken(response.data.token);
      }
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.message) {
        setErrors({ api: error.response.data.message });
      } else {
        setErrors({ api: "Signup error" });
      }
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} tabIndex={-1}>
      <div className="modal signup-modal" role="dialog" aria-modal="true">
        <button className="modal-close" aria-label="Fermer" onClick={onClose}>
          &times;
        </button>
        <h2 className="modal-title">Sign up</h2>
        <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={event => setUsername(event.target.value)}
            aria-label="Username"
          />
          {errors.username && <div className="error-message">{errors.username}</div>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            aria-label="Email"
          />
          {errors.email && <div className="error-message">{errors.email}</div>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            aria-label="Password"
          />
          {errors.password && <div className="error-message">{errors.password}</div>}

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            aria-label="Confirm password"
          />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}

          {errors.api && <div className="error-message api-error">{errors.api}</div>}
          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? 'Signing up...' : "Sign up"}
          </button>
          {success && <div className="success-message">Signup successful!</div>}
        </form>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          Already have an account?{' '}
          <span style={{ color: '#e62429', cursor: 'pointer', fontWeight: 600 }} onClick={onSwitchToLogin}>
            Log in
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignupModal; 