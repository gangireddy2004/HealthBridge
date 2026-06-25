import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ResetPassword from './pages/Login/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Opens the Login window framework context by default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Wildcard Fallback catch routing pattern layout */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;