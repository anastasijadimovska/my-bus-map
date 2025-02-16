import React, { useState, useEffect } from 'react';
import { getSavedBusLinesForUser } from '../api/savedBusLinesService';

const SavedBusLinesList = () => {
    const [savedBusLines, setSavedBusLines] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await getSavedBusLinesForUser();
                // Extract the busLines array from the returned object
                const busLines = data?.busLines || [];
                setSavedBusLines(busLines);
            } catch (err) {
                console.error(err);
                setError('Не може да се вчитаат зачуваните автобус линии.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <div
                style={{
                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                    backgroundColor: "#eef4f8",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "40px"
                }}
            >
                <p>Вчитување...</p>
            </div>
        );
    }

    return (
        <div
            style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                backgroundColor: "#eef4f8",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "40px"
            }}
        >
            <h1
                style={{
                    fontSize: "2.5rem",
                    color: "#08374b",
                    fontWeight: "bold",
                    marginBottom: "20px"
                }}
            >
                Зачувани Автобус Линии
            </h1>
            {error && (
                <p style={{ color: 'red', fontSize: '1.2rem' }}>
                    {error}
                </p>
            )}
            {savedBusLines.length > 0 ? (
                <ul
                    style={{
                        listStyleType: "none",
                        padding: "0",
                        width: "80%",
                        maxWidth: "900px",
                        margin: "0 auto"
                    }}
                >
                    {savedBusLines.map((line) => (
                        <li
                            key={line.id}
                            style={{
                                backgroundColor: "#fff",
                                padding: "20px",
                                marginBottom: "15px",
                                borderRadius: "12px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                textAlign: "center",
                                fontSize: "1.3rem",
                                color: "#08374b",
                                fontWeight: "bold"
                            }}
                        >
                            {line.name} - {line.bus?.ownerName || "Непознат сопственик"}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Немате зачувани автобус линии.</p>
            )}
        </div>
    );
};

export default SavedBusLinesList;
