// RegisterPage.js
import React, { useState } from "react";
import { registerUser } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const registerData = { name, email, password, roles: "ROLE_USER" };
        try {
            await registerUser(registerData);
            navigate("/login");
        } catch (err) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div style={{ background: "linear-gradient(135deg, #08374b, #0a5275)", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" }}>
            <div style={{ width: "100%", maxWidth: "400px", padding: "40px", backgroundColor: "#ffffff", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)", textAlign: "center", color: "#08374b" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>Регистрација</h1>
                <form onSubmit={handleRegister}>
                    <div style={{ position: "relative", marginBottom: "20px" }}>
                        <FaUser style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#08374b" }} />
                        <input
                            type="text"
                            placeholder="Име и Презиме"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ width: "100%", padding: "12px 40px", border: "2px solid #ddd", borderRadius: "8px", fontSize: "1rem", color: "#08374b" }}
                        />
                    </div>
                    <div style={{ position: "relative", marginBottom: "20px" }}>
                        <FaEnvelope style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#08374b" }} />
                        <input
                            type="email"
                            placeholder="Вашиот меил"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: "100%", padding: "12px 40px", border: "2px solid #ddd", borderRadius: "8px", fontSize: "1rem", color: "#08374b" }}
                        />
                    </div>
                    <div style={{ position: "relative", marginBottom: "30px" }}>
                        <FaLock style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#08374b" }} />
                        <input
                            type="password"
                            placeholder="Вашата лозинка"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: "100%", padding: "12px 40px", border: "2px solid #ddd", borderRadius: "8px", fontSize: "1rem", color: "#08374b" }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{ width: "100%", padding: "12px", backgroundColor: "#08374b", color: "#fff", fontSize: "1.2rem", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer", transition: "background-color 0.3s" }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0a5275")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#08374b")}
                    >
                        Регистрирај се
                    </button>
                </form>
                {error && <p style={{ marginTop: "20px", color: "red", fontSize: "1.2rem", fontWeight: "bold" }}>{error}</p>}
            </div>
        </div>
    );
};

export default RegisterPage;
