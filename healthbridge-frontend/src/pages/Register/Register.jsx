import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    // 1. Form State Mapping
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'ROLE_ADMIN' // Standard matching Enum layout value
    });

    // 2. Input Change Handler
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 3. Form Submission Handler (Where the fix is applied!)
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending registration data:", formData);
            
            // FIX: Hardcoded backend base address to prevent 404 proxy mismatches
            const response = await axios.post("http://localhost:8080/api/auth/register", formData);
            
            console.log("✅ Server Response:", response.data);
            alert("Registration Successful! Redirecting to login page...");
            
            // Redirect cleanly to login screen view
            window.location.href = "/login";
            
        } catch (error) {
            console.error("❌ Registration Network Error:", error.response);
            alert(error.response?.data || "Registration failed. Check backend connection.");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Create clinical account</h2>
            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '10px' }}>
                    <label>First Name:</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Last Name:</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Workplace Email Address:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Security Access Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#0066cc', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Register Account
                </button>
            </form>
        </div>
    );
};

export default Register;