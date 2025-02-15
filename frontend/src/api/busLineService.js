import api from './axiosConfig';

export const getAllBusLines = async () => {
    const response = await api.get('/api/bus-line');
    if (typeof response.data === "string") {
        return JSON.parse(response.data);
    }
    return response.data;
};

export const getBusLineById = async (id) => {
    const response = await api.get(`/api/bus-line/${id}`);
    return response.data;
};

export const createBusLine = async (busLineDto) => {
    const response = await api.post('/api/bus-line/add', busLineDto);
    return response.data;
};

export const updateBusLine = async (id, busLineDto) => {
    const response = await api.post(`/api/bus-line/edit/${id}`, busLineDto);
    return response.data;
};

export const deleteBusLine = async (id) => {
    await api.delete(`/api/bus-line/delete/${id}`);
};

export const getBusLinesBetweenStops = async (fromStopName, toStopName) => {
    const response = await api.get('/api/bus-line/filter', {
        params: { fromStopName, toStopName }
    });
    return response.data;
};
