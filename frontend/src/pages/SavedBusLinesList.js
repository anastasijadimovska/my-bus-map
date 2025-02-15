import React, { useState, useEffect } from 'react';
import { getSavedBusLinesForUser } from '../api/savedBusLinesService';

const SavedBusLinesList = () => {
    const [savedBusLines, setSavedBusLines] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchSavedBusLines();
    }, []);

    const fetchSavedBusLines = async () => {
        try {
            const data = await getSavedBusLinesForUser();
            setSavedBusLines(data);
        } catch (err) {
            console.error(err);
            setError('Не може да се вчитаат зачуваните автобус линии.');
        }
    };

    return (
        <div style={{
            fontFamily: "'M PLUS Rounded 1c', sans-serif",
            backgroundColor: "#eef4f8",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "40px"
        }}>
            <h1 style={{ fontSize: "2.5rem", color: "#08374b", fontWeight: "bold", marginBottom: "20px" }}>
                Зачувани Автобус Линии
            </h1>
            {error && <p style={{ color: 'red', fontSize: '1.2rem' }}>{error}</p>}
            {savedBusLines ? (
                <ul style={{
                    listStyleType: "none",
                    padding: "0",
                    width: "80%",
                    maxWidth: "900px",
                    margin: "0 auto"
                }}>
                    {savedBusLines.busLines && savedBusLines.busLines.length > 0 ? (
                        savedBusLines.busLines.map((line) => (
                            <li key={line.id} style={{
                                backgroundColor: "#fff",
                                padding: "20px",
                                marginBottom: "15px",
                                borderRadius: "12px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                                fontSize: "1.3rem",
                                color: "#08374b",
                                fontWeight: "bold"
                            }}>
                                {line.name} - {line.bus.ownerName}
                            </li>
                        ))
                    ) : (
                        <p>Немате зачувани автобус линии.</p>
                    )}
                </ul>
            ) : (
                <p>Вчитување...</p>
            )}
        </div>
    );
};

export default SavedBusLinesList;
