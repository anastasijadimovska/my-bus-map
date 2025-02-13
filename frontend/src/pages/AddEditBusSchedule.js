import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBusScheduleById, createBusSchedule, updateBusSchedule } from '../api/busScheduleService';

const AddEditBusSchedule = () => {
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [busId, setBusId] = useState('');
    const [busStopId, setBusStopId] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getBusScheduleById(id)
                .then((busSchedule) => { // Fixed issue here
                    setDepartureTime(busSchedule.departureTime);
                    setArrivalTime(busSchedule.arrivalTime);
                    setBusId(busSchedule.busId);
                    setBusStopId(busSchedule.busStopId);
                })
                .catch(() => setError('Failed to fetch bus schedule.'));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const busScheduleData = { departureTime, arrivalTime, busId, busStopId };

        try {
            if (id) {
                await updateBusSchedule(id, busScheduleData);
            } else {
                await createBusSchedule(busScheduleData);
            }
            navigate('/bus-schedules');
        } catch {
            setError('Failed to save the bus schedule.');
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Bus Schedule' : 'Add Bus Schedule'}</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Departure Time:</label>
                    <input type="time" value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} required />
                </div>
                <div>
                    <label>Arrival Time:</label>
                    <input type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} required />
                </div>
                <div>
                    <label>Bus ID:</label>
                    <input type="number" value={busId} onChange={(e) => setBusId(e.target.value)} required />
                </div>
                <div>
                    <label>Bus Stop ID:</label>
                    <input type="number" value={busStopId} onChange={(e) => setBusStopId(e.target.value)} required />
                </div>
                <button type="submit">{id ? 'Update' : 'Add'} Bus Schedule</button>
            </form>
        </div>
    );
};

export default AddEditBusSchedule;
