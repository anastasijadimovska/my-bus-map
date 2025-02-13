import React, { useState, useEffect } from 'react';
import { getAllBusLines, getBusLinesBetweenStops } from '../api/busLineService';

const BusLineList = () => {
    const [busLines, setBusLines] = useState([]);
    const [fromStop, setFromStop] = useState('');
    const [toStop, setToStop] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loadBusLines();
    }, []);

    const loadBusLines = async () => {
        try {
            const data = await getAllBusLines();
            setBusLines(data);
        } catch {
            setError('Неуспешно вчитување на автобуски линии.');
        }
    };

    const handleSearch = async () => {
        if (!fromStop.trim() || !toStop.trim()) {
            setError('Внесете ги двете постојки.');
            return;
        }
        try {
            const data = await getBusLinesBetweenStops(fromStop, toStop);
            setBusLines(data);
            setError('');
        } catch {
            setError('Неуспешно пребарување.');
        }
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        if (e.target.value === '') {
            loadBusLines();
            setError('');
        }
    };

    return (
        <div style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif", backgroundColor: "#eef4f8", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "40px" }}>
            <h1 style={{ fontSize: "2.5rem", color: "#08374b", fontWeight: "bold", marginBottom: "20px" }}>Автобуски Линии</h1>

            {error && <p style={{ color: 'red', fontSize: '1.2rem' }}>{error}</p>}

            <div style={{ marginBottom: "30px", textAlign: "center", backgroundColor: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)" }}>
                <h3 style={{ fontSize: "1.5rem", color: "#08374b", fontWeight: "bold", marginBottom: "10px" }}>Најди автобус меѓу постојки</h3>
                <input
                    type="text"
                    placeholder="Од постојка"
                    value={fromStop}
                    onChange={handleInputChange(setFromStop)}
                    style={{ padding: "10px", margin: "5px", width: "220px", borderRadius: "8px", border: "1px solid #08374b", fontSize: "1rem", outline: "none" }}
                />
                <input
                    type="text"
                    placeholder="До постојка"
                    value={toStop}
                    onChange={handleInputChange(setToStop)}
                    style={{ padding: "10px", margin: "5px", width: "220px", borderRadius: "8px", border: "1px solid #08374b", fontSize: "1rem", outline: "none" }}
                />
                <button onClick={handleSearch} style={{ padding: "10px 20px", backgroundColor: "#08374b", color: "white", border: "none", borderRadius: "8px", fontSize: "1rem", cursor: "pointer", marginLeft: "10px", transition: "background 0.3s" }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0a4861")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#08374b")}
                >
                    Пребарај
                </button>
            </div>

            <ul style={{ listStyleType: "none", padding: "0", width: "80%", maxWidth: "900px", margin: "0 auto" }}>
                {busLines.map((line) => (
                    <li key={line.id} style={{
                        backgroundColor: "#fff", padding: "20px", marginBottom: "15px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        textAlign: "center", fontSize: "1.3rem", color: "#08374b", fontWeight: "bold", transition: "transform 0.2s, box-shadow 0.2s"
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)"; }}
                    >
                        {line.name} - {line.bus.ownerName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusLineList;
