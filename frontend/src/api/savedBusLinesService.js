import axios from 'axios';

const API_URL = '/api/saved-bus-lines';

/**
 * Saves a bus line for the current user.
 * The DTO expects { email: string, busLineIds: number[] }.
 * We now use the actual email stored in localStorage.
 */
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

    const response = await axios.post(`${API_URL}/add`, dto, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

/**
 * Retrieves saved bus lines for the current user.
 * Uses the actual email stored in localStorage.
 */
export const getSavedBusLinesForUser = async () => {
    const token = localStorage.getItem('authToken');
    const email = localStorage.getItem('userEmail');
    if (!token) {
        throw new Error("User is not logged in");
    }
    if (!email) {
        throw new Error("User email is not available");
    }

    const response = await axios.get(`${API_URL}/user/${email}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
