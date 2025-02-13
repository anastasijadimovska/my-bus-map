import api from './axiosConfig';

export const getAllBuses = async () => {
    const response = await api.get('/api/bus');
    return response.data;
};

export const getBusById = async (id) => {
    const response = await api.get(`/api/bus/${id}`);
    return response.data;
};

export const getBusByNumber = async (busNumber) => {
    const response = await api.get(`/api/bus/number/${busNumber}`);
    return response.data;
};

export const createBus = async (busDto) => {
    const response = await api.post('/api/bus/add', busDto);
    return response.data;
};

export const updateBus = async (id, busDto) => {
    const response = await api.post(`/api/bus/edit/${id}`, busDto);
    return response.data;
};

export const deleteBus = async (id) => {
    await api.delete(`/api/bus/delete/${id}`);
};
