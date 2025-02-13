import api from './axiosConfig';

// Register a new user
export const registerUser = async (userInfo) => {
    const response = await api.post('/auth/addNewUser', userInfo);
    return response.data;
};

// Login and get JWT token
export const loginUser = async (credentials) => {
    const response = await api.post('/auth/generateToken', credentials);
    return response.data;
};

// Logout user
export const logoutUser = async () => {
    await api.post('/auth/logout');
};
