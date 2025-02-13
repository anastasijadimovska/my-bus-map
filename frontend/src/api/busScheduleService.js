import api from './axiosConfig';

export const getAllBusSchedules = async () => {
    const response = await api.get('/api/bus-schedule');
    return response.data;
};

export const getBusScheduleById = async (id) => {
    const response = await api.get(`/api/bus-schedule/${id}`);
    return response.data;
};

export const createBusSchedule = async (busScheduleDto) => {
    const response = await api.post('/api/bus-schedule/add', busScheduleDto);
    return response.data;
};

export const updateBusSchedule = async (id, busScheduleDto) => {
    const response = await api.post(`/api/bus-schedule/edit/${id}`, busScheduleDto);
    return response.data;
};

export const deleteBusSchedule = async (id) => {
    await api.delete(`/bus-schedule/delete/${id}`);
};

export const getBusSchedulesByBusStopId = async (busStopId) => {
    const response = await api.get(`/api/bus-schedule/bus-stop/${busStopId}`);
    return response.data;
};

export const getBusSchedulesByBusId = async (busId) => {
    const response = await api.get(`/api/bus-schedule/bus/${busId}`);
    return response.data;
};

export const findSchedulesByArrivalTime = async (arrivalTime, busStopId) => {
    const response = await api.get(`/api/bus-schedule/arrival-time/bus-stop/${busStopId}`, {
        params: { arrivalTime }
    });
    return response.data;
};
