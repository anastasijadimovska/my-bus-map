import React, { useEffect, useState } from "react";
import { getAllBuses, getBusByNumber } from "../api/busService";
import { FaBus } from "react-icons/fa";

const BusList = () => {
    const [buses, setBuses] = useState([]);
    const [busNumber, setBusNumber] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadBuses();
    }, []);

    const loadBuses = async () => {
        try {
            const data = await getAllBuses();
            setBuses(data);
        } catch (error) {
            console.error("Неуспешно вчитување на автобусите:", error);
            setError("Неуспешно вчитување на автобусите.");
        }
    };

    const handleSearchByNumber = async () => {
        if (!busNumber.trim()) {
            setError("");
            loadBuses(); // Reload all buses when input is empty
            return;
        }

        try {
            const result = await getBusByNumber(busNumber);
            setBuses([result]);
            setError("");
        } catch (error) {
            console.error("Нема автобус со тој број:", error);
            setError("Нема автобус со тој број.");
        }
    };

    return (
        <div style={{ backgroundColor: "#eef4f8", fontFamily: "'M PLUS Rounded 1c', sans-serif", color: "#08374b", minHeight: "100vh", paddingTop: "50px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px", color: "#08374b", textAlign: "center"}}>Автобуси</h1>

            <div style={{ display: "flex", alignItems: "center", backgroundColor: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginBottom: "30px" }}>
                <input
                    type="text"
                    placeholder="Внесете број на автобус"
                    value={busNumber}
                    onChange={(e) => {
                        setBusNumber(e.target.value);
                        if (!e.target.value.trim()) {
                            loadBuses();
                        }
                    }}
                    style={{ padding: "12px", fontSize: "1.2rem", borderRadius: "5px", border: "2px solid #08374b", marginRight: "10px", width: "250px", outline: "none" }}
                />
                <button
                    onClick={handleSearchByNumber}
                    style={{ padding: "12px 20px", backgroundColor: "#08374b", color: "#fff", border: "none", borderRadius: "5px", fontSize: "1.2rem", cursor: "pointer", transition: "background 0.3s ease" }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#0a4861")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#08374b")}
                >
                    Најди по број
                </button>
            </div>

            {error && <p style={{ color: "red", fontSize: "1.2rem", fontWeight: "500", marginBottom: "20px" }}>{error}</p>}

            <ul style={{ width: "80%", maxWidth: "800px", listStyleType: "none", padding: "0" }}>
                {buses.map((bus) => (
                    <li key={bus.id} style={{ backgroundColor: "#fff", marginBottom: "15px", padding: "20px", borderRadius: "15px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)", display: "flex", alignItems: "center", fontSize: "1.3rem", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.15)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)"; }}
                    >
                        <FaBus style={{ fontSize: "2.5rem", color: "#08374b", marginRight: "15px" }} />
                        <div>
                            <p style={{ margin: "0" }}>Број на автобус: <span><strong>{bus.busNumber}</strong></span></p>
                            <p style={{ margin: "5px 0 0" }}>Компанија: <span><strong>{bus.ownerName}</strong></span></p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusList;
