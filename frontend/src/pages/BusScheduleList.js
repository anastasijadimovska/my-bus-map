import React, { useEffect, useState } from 'react';
import {
    getAllBusSchedules,
    getBusSchedulesByBusStopId,
    getBusSchedulesByBusId,
    findSchedulesByArrivalTime
} from '../api/busScheduleService';
import { getAllBusStops } from '../api/busStopService'; // Import API for bus stops

const BusScheduleList = () => {
    const [schedules, setSchedules] = useState([]);
    const [busStopId, setBusStopId] = useState('');
    const [busId, setBusId] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [busStops, setBusStops] = useState([]); // Store bus stops
    const [error, setError] = useState('');

    // Fetch schedules & bus stops on mount
    useEffect(() => {
        getAllBusSchedules()
            .then(setSchedules)
            .catch(() => setError('Не можеме да ги вчитаме распоредите.'));

        getAllBusStops()
            .then(setBusStops)
            .catch(() => setError('Не можеме да ги вчитаме автобуските постојки.'));
    }, []);

    const handleFetchByBusStop = async () => {
        if (!busStopId) {
            setError('Изберете постојка.');
            return;
        }

        try {
            const result = await getBusSchedulesByBusStopId(busStopId);
            setSchedules(result);
            setError('');
        } catch {
            setError('Нема распореди за оваа постојка.');
        }
    };

    const handleFetchByBusId = async () => {
        if (!busId.trim()) {
            setError('Внесете број на автобус.');
            return;
        }

        try {
            const result = await getBusSchedulesByBusId(busId);
            setSchedules(result);
            setError('');
        } catch {
            setError('Нема распореди за овој автобус.');
        }
    };

    const handleFetchByArrivalTime = async () => {
        if (!arrivalTime.trim() || !busStopId) {
            setError('Изберете постојка и внесете време.');
            return;
        }

        try {
            const result = await findSchedulesByArrivalTime(arrivalTime, busStopId);
            setSchedules(result);
            setError('');
        } catch {
            setError('Нема распореди за ова време и постојка.');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Распоред на автобуси</h1>

            {/* Search Section */}
            <div style={styles.searchBox}>
                <select value={busStopId} onChange={(e) => setBusStopId(e.target.value)} style={styles.input}>
                    <option value="">Избери постојка</option>
                    {busStops.map((stop) => (
                        <option key={stop.id} value={stop.id}>{stop.name}</option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Внеси број на автобус"
                    value={busId}
                    onChange={(e) => setBusId(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    style={styles.input}
                />

                <button onClick={handleFetchByBusStop} style={styles.button}>Најди по постојка</button>
                <button onClick={handleFetchByBusId} style={styles.button}>Најди по автобус</button>
                <button onClick={handleFetchByArrivalTime} style={styles.button}>Најди по време</button>

                {error && <p style={styles.error}>{error}</p>}
            </div>

            {/* Bus Schedule List */}
            <ul style={styles.list}>
                {schedules.length > 0 ? (
                    schedules.map((schedule) => (
                        <li key={schedule.id} style={styles.listItem}>
                            <strong>Автобус:</strong> {schedule.bus.busNumber} | <strong>Постојка:</strong> {schedule.busStop.name} | <strong>Време:</strong> {schedule.arrivalTime}
                        </li>
                    ))
                ) : (
                    <p style={styles.noData}>Нема податоци.</p>
                )}
            </ul>
        </div>
    );
};

// Styling
const styles = {
    container: {
        backgroundColor: "#f5f5f5",
        fontFamily: "'M PLUS Rounded 1c', sans-serif",
        color: "#08374b",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
    },
    title: {
        fontSize: "2.5rem",
        fontWeight: "bold",
        color: "#08374b",
        marginBottom: "20px",
    },
    searchBox: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        maxWidth: "600px",
        width: "100%",
        marginBottom: "20px",
    },
    input: {
        padding: "10px",
        fontSize: "1rem",
        width: "100%",
        maxWidth: "400px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        margin: "10px 0",
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#08374b",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "1rem",
        cursor: "pointer",
        margin: "5px",
    },
    error: {
        color: "#f44336",
        fontWeight: "bold",
        marginTop: "10px",
    },
    list: {
        listStyleType: "none",
        padding: "0",
        maxWidth: "600px",
        width: "100%",
    },
    listItem: {
        backgroundColor: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        marginBottom: "10px",
    },
    noData: {
        color: "#888",
        fontSize: "1.2rem",
        textAlign: "center",
    },
};

export default BusScheduleList;
