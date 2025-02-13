import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBusLines, deleteBusLine, getBusLinesBetweenStops } from '../api/busLineService';
import {FaTrashAlt, FaEdit } from 'react-icons/fa'; // Add icons for edit and delete

const BusLineList = () => {
    const [busLines, setBusLines] = useState([]);
    const [fromStop, setFromStop] = useState('');
    const [toStop, setToStop] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await loadBusLines();
        })();
    }, []);

    const loadBusLines = async () => {
        try {
            const data = await getAllBusLines();
            setBusLines(data);
        } catch {
            setError('Failed to load bus lines.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteBusLine(id);
            setBusLines((prevBusLines) => prevBusLines.filter((line) => line.id !== id));
        } catch {
            setError('Failed to delete bus line.');
        }
    };

    const handleSearch = async () => {
        if (!fromStop || !toStop) {
            setError('Please enter both stops.');
            return;
        }
        try {
            const data = await getBusLinesBetweenStops(fromStop, toStop);
            setBusLines(data);
            setError('');
        } catch {
            setError('Failed to fetch bus lines between stops.');
        }
    };

    return (
        <div style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif", backgroundColor: "#f4f7fa", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "40px" }}>
            <h1 style={{ fontSize: "3rem", color: "#08374b", fontWeight: "bold", marginBottom: "20px" }}>Автобуски Линии</h1>

            {error && <p style={{ color: 'red', fontSize: '1.2rem' }}>{error}</p>}

            <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <button onClick={() => navigate('/bus-lines/add')} style={{
                    padding: "10px 20px", backgroundColor: "#5c7f8e", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", cursor: "pointer", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
                }}>
                    Додај нова линија
                </button>
            </div>

            <div style={{ marginBottom: "30px", textAlign: "center" }}>
                <h3 style={{ fontSize: "1.8rem", color: "#08374b", fontWeight: "bold" }}>Најди автобус меѓу постојки</h3>
                <input
                    type="text"
                    placeholder="Од постојка"
                    value={fromStop}
                    onChange={(e) => setFromStop(e.target.value)}
                    style={{
                        padding: "10px", margin: "10px", width: "200px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem"
                    }}
                />
                <input
                    type="text"
                    placeholder="До постојка"
                    value={toStop}
                    onChange={(e) => setToStop(e.target.value)}
                    style={{
                        padding: "10px", margin: "10px", width: "200px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "1rem"
                    }}
                />
                <button onClick={handleSearch} style={{
                    padding: "10px 20px", backgroundColor: "#5c7f8e", color: "white", border: "none", borderRadius: "8px", fontSize: "1.1rem", cursor: "pointer", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
                }}>
                    Пребарај
                </button>
            </div>

            <ul style={{ listStyleType: "none", padding: "0", width: "80%", margin: "0 auto" }}>
                {busLines.map((line) => (
                    <li key={line.id} style={{
                        backgroundColor: "#fff", padding: "20px", marginBottom: "15px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", display: "flex", justifyContent: "space-between", alignItems: "center"
                    }}>
                        <div>
                            <h4 style={{ fontSize: "1.6rem", color: "#08374b", fontWeight: "bold" }}>{line.name}: {line.bus.ownerName}</h4>
                        </div>
                        <div>
                            <button onClick={() => navigate(`/bus-lines/edit/${line.id}`)} style={{
                                padding: "8px 16px", backgroundColor: "#4e6b73", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", marginRight: "10px"
                            }}>
                                <FaEdit size={18} />
                            </button>
                            <button onClick={() => handleDelete(line.id)} style={{
                                padding: "8px 16px", backgroundColor: "#d9534f", color: "white", border: "none", borderRadius: "8px", cursor: "pointer"
                            }}>
                                <FaTrashAlt size={18} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusLineList;
