import api from '../api/axiosInstance';

export const standardService = {
    getAll: async () => {
        const response = await api.get('/standard');
        return response.data;
    }
};