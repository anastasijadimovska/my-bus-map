import api from './axiosConfig';

export const getAllBusStops = async () => {
    const response = await api.get('/api/bus-stop');
    return response.data;
};

export const getBusStopById = async (id) => {
    const response = await api.get(`/api/bus-stop/${id}`);
    return response.data;
};

export const createBusStop = async (busStopDto) => {
    const response = await api.post('/api/bus-stop/add', busStopDto);
    return response.data;
};

export const updateBusStop = async (id, busStopDto) => {
    const response = await api.post(`/api/bus-stop/edit/${id}`, busStopDto);
    return response.data;
};

export const deleteBusStop = async (id) => {
    await api.delete(`/api/bus-stop/delete/${id}`);
};

export const searchBusStopByName = async (name) => {
    const response = await api.get('/api/bus-stop/search', {
        params: { name }
    });
    return response.data;
};
