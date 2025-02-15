import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getAllBusStops } from '../api/busStopService'; // Adjust the path accordingly
import L from 'leaflet';

// Fix for missing marker icons in Leaflet with Webpack/CRA
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Maps = () => {
    // Bus stops state from API
    const [busStops, setBusStops] = useState([]);

    // Coordinates for Bitola, Macedonia
    const bitolaCenter = [41.0290, 21.3333];

    useEffect(() => {
        const fetchBusStops = async () => {
            try {
                const data = await getAllBusStops();
                setBusStops(data);
            } catch (error) {
                console.error('Error fetching bus stops:', error);
            }
        };

        fetchBusStops();
    }, []);

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Мапа со постојки</h2>
            <MapContainer
                center={bitolaCenter}
                zoom={13}
                style={{
                    height: '900px',
                    width: '100%',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="https://carto.com/">CartoDB</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {busStops.map((stop, index) => (
                    <Marker key={index} position={[stop.latitude, stop.longitude]}>
                        <Popup>
                            Постојка:
                            {" "+stop.name}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

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
};

export default Maps;
