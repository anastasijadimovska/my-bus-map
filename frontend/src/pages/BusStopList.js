import React, { useEffect, useState } from 'react';
import { getAllBusStops, searchBusStopByName, deleteBusStop } from '../api/busStopService';
import { FaSearch, FaTrashAlt } from 'react-icons/fa';

const BusStopList = () => {
    const [busStops, setBusStops] = useState([]); // All bus stops
    const [searchTerm, setSearchTerm] = useState(''); // Search input
    const [searchResult, setSearchResult] = useState(null); // Search result
    const [error, setError] = useState(''); // Error message

    // Fetch all bus stops on component mount
    useEffect(() => {
        getAllBusStops()
            .then((data) => setBusStops(data))
            .catch((err) => {
                console.error("Error fetching bus stops:", err);
                setError('Failed to load bus stops. Please try again later.');
            });
    }, []);

    // Handle search functionality
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setError('Please enter a valid search term.');
            return;
        }

        try {
            const result = await searchBusStopByName(searchTerm);
            if (result) {
                setSearchResult(result);
                setError('');
            } else {
                setSearchResult(null);
                setError('No bus stop found with the given name.');
            }
        } catch (err) {
            console.error("Error searching bus stop:", err);
            setError('Failed to search bus stop. Please try again later.');
        }
    };

    // Reset search results
    const resetSearch = () => {
        setSearchResult(null);
        setSearchTerm('');
        setError('');
    };

    // Handle bus stop deletion
    const handleDelete = async (id) => {
        try {
            await deleteBusStop(id);
            setBusStops((prevStops) => prevStops.filter((stop) => stop.id !== id));
        } catch (err) {
            console.error("Error deleting bus stop:", err);
            setError('Failed to delete bus stop. Please try again later.');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Постојки</h1>

            {/* Search Input */}
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Пребарај по име"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />
                <button onClick={handleSearch} style={styles.searchButton}>
                    <FaSearch />
                </button>
                <button onClick={resetSearch} style={styles.resetButton}>Рестарирај</button>
            </div>

            {/* Error Message */}
            {error && <p style={styles.error}>{error}</p>}

            {/* Search Result or List */}
            {searchResult ? (
                <div style={styles.resultContainer}>
                    <h2 style={styles.subheading}>Search Result:</h2>
                    <p style={styles.resultName}>{searchResult.name}</p>
                </div>
            ) : (
                <ul style={styles.busStopList}>
                    {busStops.map((stop) => (
                        <li key={stop.id} style={styles.busStopItem}>
                            {stop.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Styles for the component
const styles = {
    container: {
        backgroundColor: '#f4f8fb',
        fontFamily: "'M PLUS Rounded 1c', sans-serif",
        color: '#08374b',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '40px',
        padding: '20px',
    },
    heading: {
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#08374b',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    searchInput: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #ddd',
        width: '300px',
        marginRight: '10px',
    },
    searchButton: {
        padding: '10px 15px',
        backgroundColor: '#08374b',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1.1rem',
    },
    resetButton: {
        marginLeft: '10px',
        padding: '10px 15px',
        backgroundColor: '#f1f1f1',
        border: '1px solid #ddd',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1.1rem',
    },
    error: {
        color: 'red',
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    resultContainer: {
        textAlign: 'center',
        marginTop: '20px',
    },
    subheading: {
        fontSize: '2rem',
        marginBottom: '10px',
    },
    resultName: {
        fontSize: '1.5rem',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    deleteButton: {
        padding: '10px 15px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1rem',
        marginLeft: '10px',
    },
    busStopList: {
        listStyleType: 'none',
        padding: '0',
        width: '100%',
        maxWidth: '600px',
        marginTop: '20px',
    },
    busStopItem: {
        backgroundColor: '#fff',
        marginBottom: '15px',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
};

export default BusStopList;
