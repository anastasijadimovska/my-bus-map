import React, { useEffect, useState } from 'react';
import {
    getAllBusSchedules,
    getBusSchedulesByBusId,
    findSchedulesByArrivalTime
} from '../api/busScheduleService';
import { getAllBusStops } from '../api/busStopService';

const BusScheduleList = () => {
    const [schedules, setSchedules] = useState([]);
    const [busStopId, setBusStopId] = useState('');
    const [busId, setBusId] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [busStops, setBusStops] = useState([]);
    const [error, setError] = useState('');

    // Function to load all schedules
    const fetchAllSchedules = () => {
        getAllBusSchedules()
            .then(setSchedules)
            .catch(() => setError('Не можеме да ги вчитаме распоредите.'));
    };

    useEffect(() => {
        // Set body background color
        document.body.style.backgroundColor = "#f4f8fb";

        fetchAllSchedules();

        getAllBusStops()
            .then(setBusStops)
            .catch(() => setError('Не можеме да ги вчитаме автобуските постојки.'));
    }, []);

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
        if (!busStopId || !arrivalTime.trim()) {
            setError('За пребарување по време, внесете и постојка и време.');
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

    // Reset all search inputs and reload all schedules
    const handleReset = () => {
        setBusStopId('');
        setBusId('');
        setArrivalTime('');
        setError('');
        fetchAllSchedules();
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Распоред на автобуси</h1>

            <div style={styles.searchContainer}>
                {/* Search by Arrival Time */}
                <div style={styles.searchBox}>
                    <h2 style={styles.searchTitle}>Пребарување по време</h2>
                    <select
                        value={busStopId}
                        onChange={(e) => setBusStopId(e.target.value)}
                        style={styles.input}
                    >
                        <option value="">Избери постојка</option>
                        {busStops.map((stop) => (
                            <option key={stop.id} value={stop.id}>{stop.name}</option>
                        ))}
                    </select>
                    <input
                        type="time"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        style={styles.input}
                    />
                    <button onClick={handleFetchByArrivalTime} style={styles.button}>
                        Најди по време
                    </button>
                    <span style={styles.note}>
            За пребарување по време, внесете и постојка и време.
          </span>
                </div>

                {/* Search by Bus ID */}
                <div style={{ ...styles.searchBox, ...styles.busIdSearchBox }}>
                    <h2 style={styles.searchTitle}>Пребарување по автобус</h2>
                    <input
                        type="text"
                        placeholder="Внеси број на автобус"
                        value={busId}
                        onChange={(e) => setBusId(e.target.value)}
                        style={styles.input2}
                    />
                    <button onClick={handleFetchByBusId} style={styles.button}>
                        Најди по автобус
                    </button>
                </div>
            </div>

            <button onClick={handleReset} style={styles.resetButton}>Рестартирај</button>

            {error && <p style={styles.error}>{error}</p>}

            <ul style={styles.list}>
                {schedules.length > 0 ? (
                    schedules.map((schedule) => (
                        <li key={schedule.id} style={styles.listItem}>
                            <div style={styles.scheduleItem}>
                                <span style={styles.scheduleLabel}><strong>Автобус:</strong></span>
                                <span>{schedule.bus.busNumber}</span>
                            </div>
                            <div style={styles.scheduleItem}>
                                <span style={styles.scheduleLabel}><strong>Постојка:</strong></span>
                                <span>{schedule.busStop.name}</span>
                            </div>
                            <div style={styles.scheduleItem}>
                                <span style={styles.scheduleLabel}><strong>Време:</strong></span>
                                <span>{schedule.arrivalTime}</span>
                            </div>
                        </li>
                    ))
                ) : (
                    <p style={styles.noData}>Нема податоци.</p>
                )}
            </ul>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'M PLUS Rounded 1c', sans-serif",
        color: "#08374b",
        textAlign: "center",
    },
    title: {
        paddingTop: "20px",
        fontSize: "2.5rem",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    searchContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
        marginBottom: "40px",
        marginTop: "50px",
    },
    searchBox: {
        backgroundColor: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        minWidth: "250px",
        maxWidth: "400px",
        flex: "1",
        border: "1px solid #ccc",
    },
    busIdSearchBox: {
        flexDirection: "column",
        justifyContent: "center",
    },
    searchTitle: {
        fontSize: "1.3rem",
        marginBottom: "20px",
        color: "#08374b",
    },
    input: {
        padding: "8px",
        fontSize: "0.9rem",
        width: "100%",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        boxShadow: "0 2x 10px rgba(0, 0, 0, 0.1)",
    },
    input2: {
        padding: "8px",
        fontSize: "0.9rem",
        width: "100%",
        marginTop: "50px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        boxShadow: "0 2x 10px rgba(0, 0, 0, 0.1)",
    },
    button: {
        padding: "8px 12px",
        backgroundColor: "#08374b",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        fontSize: "0.9rem",
        cursor: "pointer",
        width: "100%",
        marginBottom: "10px",
    },
    resetButton: {
        padding: "8px 12px",
        backgroundColor: "#fff",
        color: "#08374b",
        border: "2px solid #ddd",
        borderRadius: "5px",
        fontSize: "0.9rem",
        cursor: "pointer",
        marginBottom: "20px",
    },
    note: {
        display: "block",
        marginTop: "5px",
        fontSize: "0.8rem",
        color: "#555",
    },
    error: {
        color: "#f44336",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    list: {
        listStyleType: "none",
        padding: "0",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
    },
    listItem: {
        backgroundColor: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        border: "1px solid #ccc",
        textAlign: "left",
    },
    scheduleItem: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "5px",
    },
    scheduleLabel: {
        marginRight: "10px",
        color: "#08374b",
    },
    noData: {
        color: "#888",
        fontSize: "1.2rem",
    },


};

export default BusScheduleList;
