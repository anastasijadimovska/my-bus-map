// LoginPage.js
import React, { useState } from 'react';
import { loginUser } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('All fields are required.');
            return;
        }
        try {
            const token = await loginUser({ email, password });
            localStorage.setItem('authToken', token);
            localStorage.setItem("userEmail", email)// Save JWT token
            navigate('/home'); // Redirect to home or protected page
        } catch {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div style={{ backgroundColor: "#f7f7f7", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" }}>
            <div style={{ width: "100%", maxWidth: "400px", padding: "40px", backgroundColor: "#fff", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", textAlign: "center" }}>
                <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px", color: "#08374b" }}>Најава</h1>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Вашиот меил"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "15px", marginBottom: "20px", border: "2px solid #e1e1e1", borderRadius: "8px", fontSize: "1rem", color: "#08374b" }}
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Вашата лозинка"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: "100%", padding: "15px", marginBottom: "30px", border: "2px solid #e1e1e1", borderRadius: "8px", fontSize: "1rem", color: "#08374b" }}
                    />
                    <br />
                    <button
                        type="submit"
                        style={{ width: "100%", padding: "15px", backgroundColor: "#08374b", color: "#fff", fontSize: "1.2rem", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer", transition: "background-color 0.3s" }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#064a61")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#08374b")}
                    >
                        Најави се
                    </button>
                </form>
                {error && <p style={{ marginTop: "20px", color: "red", fontSize: "1.2rem", fontWeight: "bold" }}>{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
