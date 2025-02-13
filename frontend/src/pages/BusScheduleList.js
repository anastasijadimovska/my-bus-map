import React, { useEffect, useState } from 'react';
import {
    getAllBusSchedules,
    deleteBusSchedule,
    getBusSchedulesByBusStopId,
    getBusSchedulesByBusId,
    findSchedulesByArrivalTime
} from '../api/busScheduleService';

const BusScheduleList = () => {
    const [schedules, setSchedules] = useState([]);
    const [busStopId, setBusStopId] = useState('');
    const [busId, setBusId] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        getAllBusSchedules()
            .then((data) => setSchedules(data))
            .catch((error) => {
                console.error("Error fetching schedules:", error);
                setError('Failed to load bus schedules. Please try again later.');
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteBusSchedule(id);
            setSchedules(schedules.filter(schedule => schedule.id !== id));
        } catch (error) {
            console.error("Error deleting schedule:", error);
            setError('Failed to delete bus schedule.');
        }
    };

    const handleFetchByBusStop = async () => {
        if (!busStopId.trim()) {
            setError('Please enter a valid Bus Stop ID.');
            return;
        }

        try {
            const result = await getBusSchedulesByBusStopId(busStopId);
            setSchedules(result);
            setError('');
        } catch (error) {
            console.error("Error fetching schedules by bus stop:", error);
            setError('No schedules found for the given Bus Stop ID.');
        }
    };

    const handleFetchByBusId = async () => {
        if (!busId.trim()) {
            setError('Please enter a valid Bus ID.');
            return;
        }

        try {
            const result = await getBusSchedulesByBusId(busId);
            setSchedules(result);
            setError('');
        } catch (error) {
            console.error("Error fetching schedules by bus ID:", error);
            setError('No schedules found for the given Bus ID.');
        }
    };

    const handleFetchByArrivalTime = async () => {
        if (!arrivalTime.trim() || !busStopId.trim()) {
            setError('Please enter both Arrival Time and Bus Stop ID.');
            return;
        }

        try {
            const result = await findSchedulesByArrivalTime(arrivalTime, busStopId);
            setSchedules(result);
            setError('');
        } catch (error) {
            console.error("Error fetching schedules by arrival time:", error);
            setError('No schedules found for the given Arrival Time and Bus Stop ID.');
        }
    };

    return (
        <div
            style={{
                backgroundColor: "#f5f5f5",
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                color: "#08374b",
                minHeight: "100vh",
                paddingTop: "80px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 15px"
            }}
        >
            <h1
                style={{
                    fontSize: "2.5rem",
                    fontWeight: "bold",
                    color: "#08374b",
                    marginBottom: "30px",
                }}
            >
                Распоред на автобуси
            </h1>

            {/* Search Section */}
            <div
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    marginBottom: "40px",
                    maxWidth: "800px",
                    width: "100%",
                    textAlign: "center"
                }}
            >
                <div style={{ marginBottom: "20px" }}>
                    <input
                        type="text"
                        placeholder="Enter Bus Stop ID"
                        value={busStopId}
                        onChange={(e) => setBusStopId(e.target.value)}
                        style={{
                            padding: "10px",
                            fontSize: "1rem",
                            width: "100%",
                            maxWidth: "300px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            marginRight: "10px"
                        }}
                    />
                    <button
                        onClick={handleFetchByBusStop}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#08374b",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "1rem",
                            cursor: "pointer"
                        }}
                    >
                        Најди по постојка
                    </button>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <input
                        type="text"
                        placeholder="Enter Bus ID"
                        value={busId}
                        onChange={(e) => setBusId(e.target.value)}
                        style={{
                            padding: "10px",
                            fontSize: "1rem",
                            width: "100%",
                            maxWidth: "300px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            marginRight: "10px"
                        }}
                    />
                    <button
                        onClick={handleFetchByBusId}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#08374b",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "1rem",
                            cursor: "pointer"
                        }}
                    >
                        Најди по автобус
                    </button>
                </div>

                <div style={{ marginBottom: "20px" }}>
                    <input
                        type="time"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        style={{
                            padding: "10px",
                            fontSize: "1rem",
                            width: "100%",
                            maxWidth: "300px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            marginRight: "10px"
                        }}
                    />
                    <button
                        onClick={handleFetchByArrivalTime}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#08374b",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "1rem",
                            cursor: "pointer"
                        }}
                    >
                        Најди по време на пристигнување
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <p
                        style={{
                            color: "#f44336",
                            fontWeight: "bold",
                            marginTop: "10px",
                        }}
                    >
                        {error}
                    </p>
                )}
            </div>

            {/* Bus Schedules List */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "800px",
                    margin: "20px auto",
                }}
            >
                <ul
                    style={{
                        listStyleType: "none",
                        padding: "0",
                    }}
                >
                    {schedules.map((schedule) => (
                        <li
                            key={schedule.id}
                            style={{
                                backgroundColor: "#fff",
                                padding: "15px",
                                borderRadius: "10px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                marginBottom: "15px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div>
                                <strong>Bus ID:</strong> {schedule.busId} | <strong>Stop:</strong> {schedule.busStopId} | <strong>Arrival Time:</strong> {schedule.arrivalTime}
                            </div>
                            <button
                                onClick={() => handleDelete(schedule.id)}
                                style={{
                                    padding: "8px 15px",
                                    backgroundColor: "#d32f2f",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                }}
                            >
                                Избриши
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BusScheduleList;
