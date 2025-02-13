import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBusStopById, createBusStop, updateBusStop } from '../api/busStopService';

const AddEditBusStop = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getBusStopById(id)
                .then(response => {
                    const busStop = response.data;
                    setName(busStop.name);
                    setLocation(busStop.location);
                })
                .catch(() => setError('Failed to fetch bus stop.'));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const busStopData = { name, location };

        try {
            if (id) {
                await updateBusStop(id, busStopData);
            } else {
                await createBusStop(busStopData);
            }
            navigate('/bus-stops');
        } catch {
            setError('Failed to save the bus stop.');
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Bus Stop' : 'Add Bus Stop'}</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Bus Stop Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Location:</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <button type="submit">{id ? 'Update' : 'Add'} Bus Stop</button>
            </form>
        </div>
    );
};

export default AddEditBusStop;
