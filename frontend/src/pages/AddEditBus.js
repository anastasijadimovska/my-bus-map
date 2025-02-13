import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createBus, getBusById, updateBus } from '../api/busService';

const AddEditBus = () => {
    const [busNumber, setBusNumber] = useState('');
    const [capacity, setCapacity] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    // ✅ Fix: Wrapped in useCallback
    const fetchBusDetails = useCallback(async () => {
        try {
            const bus = await getBusById(id);
            setBusNumber(bus.busNumber);
            setCapacity(bus.capacity);
        } catch {
            setError('Failed to load bus details.');
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            // ✅ Fix: Explicitly handling the async function inside useEffect
            (async () => {
                await fetchBusDetails();
            })();
        }
    }, [id, fetchBusDetails]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!busNumber || !capacity) {
            setError('All fields are required.');
            return;
        }
        try {
            if (id) {
                await updateBus(id, { busNumber, capacity });
            } else {
                await createBus({ busNumber, capacity });
            }
            setSuccess('Operation successful!');
            setTimeout(() => navigate('/buses'), 2000);
        } catch {
            setError('Failed to save the bus.');
        }
    };

    return (
        <div>
            <h1>{id ? 'Edit Bus' : 'Add New Bus'}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Bus Number"
                    value={busNumber}
                    onChange={(e) => setBusNumber(e.target.value)}
                    required
                />
                <br />
                <input
                    type="number"
                    placeholder="Capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    required
                />
                <br />
                <button type="submit">{id ? 'Update' : 'Add'} Bus</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default AddEditBus;
