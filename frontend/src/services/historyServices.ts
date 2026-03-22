import api from '../api/axiosInstance';

export const historyService = {
    getAll: async (searchId?: string) => {
        const response = await api.get('/history', {
            params: { id: searchId }
        });
        return response.data;
    },

    delete: async (ids: string[]) => {
        const response = await api.delete('/history', {
            data: { ids }
        });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get(`/history/${id}`);
        return response.data;
    },

    create: async (payload: any) => {
        const response = await api.post('history', payload);
        return response.data;
    },

    update: async (id: string, payload: any) => {
        const response = await api.patch(`/history/${id}`, payload);
        return response.data;
    }
}