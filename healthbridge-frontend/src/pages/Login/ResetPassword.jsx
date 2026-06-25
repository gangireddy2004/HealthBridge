import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import API from '../../services/api'; // Ensure proper relative mapping path to services
import './Login.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Automatically pulls ?token=XYZ from the email URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // Connects directly to your backend update routing pipeline
      const response = await API.post('/auth/reset-password', { token, newPassword });
      
      setMessage(response.data || "Password securely updated in MySQL database successfully!");
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      alert(err.response?.data || "Reset token expired or invalid code structural coordinate mapping.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-view-canvas">
      <div className="wizard-body-card" style={{ maxWidth: '440px', width: '100%', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: 'var(--shadow-lg)' }}>
        <h3 style={{ marginBottom: '10px', fontSize: '1.4rem', fontWeight: '700' }}>Create New Password</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
          Token authenticated. Update your cryptographic database login cipher.
        </p>

        {message ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '1.05rem' }}>{message}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '10px' }}>Redirecting to login workspace...</p>
          </div>
        ) : (
          <form onSubmit={handlePasswordResetSubmit} className="interactive-form-stack" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="input-block-standard" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>New Secure Password</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
                style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '1rem', outline: 'none' }}
              />
            </div>
            <div className="input-block-standard" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Confirm New Password</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                style={{ padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '1rem', outline: 'none' }}
              />
            </div>
            <button 
              type="submit" 
              className="action-btn-primary" 
              style={{ marginTop: '10px', padding: '14px', borderRadius: '6px', fontWeight: '700', fontSize: '1rem' }}
              disabled={loading}
            >
              {loading ? "Modifying Matrix Keys..." : "Update Database Credentials"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;