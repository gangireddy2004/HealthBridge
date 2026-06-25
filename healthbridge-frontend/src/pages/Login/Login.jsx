import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../services/api'; // Ensure this points correctly to your Axios instance file path
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Interactive Modal Popup Overlay States
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token || 'mock_jwt_token');
      localStorage.setItem('role', response.data.role || 'ROLE_ADMIN');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data || "Authentication rejected. Check your input credentials.");
    }
  };

  // Connected Reset Transmission Routine Handler
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!recoveryEmail) return;

    setLoading(true);
    try {
      // Hits the Spring Boot Endpoint: @PostMapping("/forgot-password")
      const response = await API.post('/auth/forgot-password', { email: recoveryEmail });
      alert(response.data || "Reset instructions dispatched completely. Check your inbox!");
      setShowForgotModal(false);
      setRecoveryEmail('');
    } catch (err) {
      alert(err.response?.data || "An error occurred. Make sure the email is registered.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-wrapper">
      {/* Left Branding Canvas Panel */}
      <div className="brand-display-section">
        <div className="brand-canvas-overlay" />
        <div className="brand-content-stack">
          <div className="app-logo-mark">
            <span className="pulse-dot" />
            <h2>HealthBridge</h2>
          </div>
          <h1>Connecting Patients with Better Healthcare</h1>
          <p>Experience an integrated hospital workflow platform optimized for modern healthcare environments.</p>
          <div className="vector-art-placeholder">
            <div className="mock-medical-icon pulse" />
            <div className="mock-chart-line" />
          </div>
        </div>
      </div>

      {/* Right User Authentication Panel */}
      <div className="form-interactive-section">
        <div className="glass-auth-card">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Access your medical workstation portal</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="interactive-form-stack">
            {/* Floating Workplace Email Field */}
            <div className="floating-field-group">
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required 
              />
              <label>Workplace Email Address</label>
            </div>

            {/* Floating Password Field with View Toggle Trigger */}
            <div className="floating-field-group password-group">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                required 
              />
              <label>Security Access Password</label>
              <button 
                type="button" 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Remembers and Passcode State Recoveries */}
            <div className="form-utility-row">
              <label className="checkbox-custom-container">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark" />
                Remember this workstation
              </label>
              
              <button 
                type="button" 
                onClick={() => setShowForgotModal(true)} 
                className="recovery-hyperlink-btn"
              >
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="action-btn-primary animated-pulse">
              Authenticate Account
            </button>

            <div className="separator-line"><span>or continue with enterprise SSO</span></div>

            {/* Side-by-Side Dual SSO Button Cluster */}
            <div className="sso-buttons-row">
              <button type="button" className="action-btn-oauth" onClick={() => alert('Redirecting to Google Workspaces IDP...')}>
                <span className="sso-icon">🌐</span>
                Google Workspace
              </button>
              <button type="button" className="action-btn-oauth" onClick={() => alert('Redirecting to Outlook Exchange Server...')}>
                <span className="sso-icon">✉️</span>
                Outlook Mail
              </button>
            </div>
          </form>

          <p className="auth-footer-prompt">
            New to the platform? <Link to="/register">Create clinical account</Link>
          </p>
        </div>
      </div>

      {/* DYNAMIC FORGOT PASSWORD MODAL OVERLAY COMPONENT LAYER */}
      {showForgotModal && (
        <div className="modal-overlay-wrapper">
          <form onSubmit={handleForgotPasswordSubmit} className="glass-modal-card">
            <h3>Account Credential Reset</h3>
            <p>Enter your authorization email to request a secure cryptographic identity reset link.</p>
            <input 
              type="email" 
              placeholder="Confirm security email coordinates..." 
              value={recoveryEmail}
              onChange={(e) => setRecoveryEmail(e.target.value)}
              required 
            />
            <div className="modal-actions-row">
              <button type="button" className="action-btn-oauth reset-cancel-btn" onClick={() => setShowForgotModal(false)} disabled={loading}>
                Cancel
              </button>
              <button 
                type="submit" 
                className="action-btn-primary reset-trigger" 
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Request"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;