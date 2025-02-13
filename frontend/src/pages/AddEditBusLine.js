import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBusLineById, createBusLine, updateBusLine } from '../api/busLineService';

const AddEditBusLine = () => {
    const [lineNumber, setLineNumber] = useState('');
    const [route, setRoute] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchBusLineDetails = useCallback(async () => {
        try {
            const busLine = await getBusLineById(id);
            setLineNumber(busLine.lineNumber);
            setRoute(busLine.route);
        } catch {
            setError('Failed to fetch bus line.');
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            (async () => {
                await fetchBusLineDetails();
            })();
        }
    }, [id, fetchBusLineDetails]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const busLineData = { lineNumber, route };

        try {
            if (id) {
                await updateBusLine(id, busLineData);
            } else {
                await createBusLine(busLineData);
            }
            setSuccess('Bus line saved successfully!');
            setTimeout(() => navigate('/bus-lines'), 2000);
        } catch {
            setError('Failed to save the bus line.');
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Bus Line' : 'Add Bus Line'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Line Number:</label>
                    <input type="text" value={lineNumber} onChange={(e) => setLineNumber(e.target.value)} required />
                </div>
                <div>
                    <label>Route:</label>
                    <input type="text" value={route} onChange={(e) => setRoute(e.target.value)} required />
                </div>
                <button type="submit">{id ? 'Update' : 'Add'} Bus Line</button>
            </form>
        </div>
    );
};

export default AddEditBusLine;
