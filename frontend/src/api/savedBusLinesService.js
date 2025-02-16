import api from './axiosConfig';

const API_URL = 'http://localhost:8080/api/saved-bus-lines'; // Updated API URL

export const saveBusLineForUser = async (busLineId) => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    if (!token) {
        throw new Error("User is not logged in");
    }
    if (!email) {
        throw new Error("User email is not available");
    }

    const dto = {
        email,
        busLineIds: [busLineId]
    };

    const response = await api.post(`${API_URL}/add`, dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const getSavedBusLinesForUser = async () => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    if (!token) {
        throw new Error("User is not logged in");
    }
    if (!email) {
        throw new Error("User email is not available");
    }

    const response = await api.get(`${API_URL}/user/${encodeURIComponent(email)}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
