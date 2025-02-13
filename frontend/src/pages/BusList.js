import React, { useEffect, useState } from "react";
import { getAllBuses, deleteBus, getBusByNumber } from "../api/busService";
import { useNavigate } from "react-router-dom";
import { FaBus } from "react-icons/fa"; // Icon for buses

const BusList = () => {
    const [buses, setBuses] = useState([]);
    const [busNumber, setBusNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await loadBuses();
        })();
    }, []);

    const loadBuses = async () => {
        try {
            const data = await getAllBuses();
            setBuses(data);
        } catch (error) {
            console.error("Error loading buses:", error);
            setError('Failed to load buses.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteBus(id);
            setBuses((prevBuses) => prevBuses.filter(bus => bus.id !== id));
        } catch (error) {
            console.error("Error deleting bus:", error);
            setError('Failed to delete bus.');
        }
    };

    const handleSearchByNumber = async () => {
        if (!busNumber.trim()) {
            setError('Please enter a valid Bus Number.');
            return;
        }

        try {
            const result = await getBusByNumber(busNumber);
            setBuses([result]);
            setError('');
        } catch (error) {
            console.error("Error fetching bus by number:", error);
            setError('No bus found with that number.');
        }
    };

    return (
        <div
            style={{
                backgroundColor: "#f0f4f8",
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                color: "#08374b",
                minHeight: "100vh",
                paddingTop: "80px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1
                style={{
                    fontSize: "3rem",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    color: "#08374b",
                }}
            >
                Автобуси
            </h1>

            {/* Search and Add Bus Section */}
            <div style={{ marginBottom: "30px" }}>
                <input
                    type="text"
                    placeholder="Внесете го бројот на автобусот"
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                    style={{
                        padding: "10px",
                        fontSize: "1.2rem",
                        borderRadius: "5px",
                        border: "2px solid #08374b",
                        marginRight: "10px",
                        width: "250px",
                    }}
                />
                <button
                    onClick={handleSearchByNumber}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#08374b",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                    }}
                >
                    Најди по број
                </button>
                <button
                    onClick={() => navigate('/buses/add')}
                    style={{
                        marginLeft: "15px",
                        padding: "10px 20px",
                        backgroundColor: "#12668d",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "1.2rem",
                        cursor: "pointer",
                    }}
                >
                    Додај нов автобус
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <p
                    style={{
                        color: "red",
                        fontSize: "1.2rem",
                        fontWeight: "500",
                    }}
                >
                    {error}
                </p>
            )}

            {/* Bus List */}
            <ul style={{ width: "80%", maxWidth: "800px", listStyleType: "none", padding: "0" }}>
                {buses.map((bus) => (
                    <li
                        key={bus.id}
                        style={{
                            backgroundColor: "#fff",
                            marginBottom: "15px",
                            padding: "15px",
                            borderRadius: "10px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "1.2rem",
                        }}
                    >
                        <div>
                            <FaBus
                                style={{
                                    fontSize: "2rem",
                                    color: "#08374b",
                                    marginRight: "10px",
                                }}
                            />
                            Број на автобус: {bus.busNumber}, Капацитет: {bus.capacity}
                        </div>

                        <div>
                            <button
                                onClick={() => navigate(`/buses/edit/${bus.id}`)}
                                style={{
                                    padding: "8px 15px",
                                    backgroundColor: "#e1e1e1",
                                    color: "#08374b",
                                    border: "none",
                                    borderRadius: "5px",
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                }}
                            >
                                Измени
                            </button>
                            <button
                                onClick={() => handleDelete(bus.id)}
                                style={{
                                    padding: "8px 15px",
                                    backgroundColor: "#ff4d4d",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                    marginLeft: "10px",
                                }}
                            >
                                Избриши
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusList;
