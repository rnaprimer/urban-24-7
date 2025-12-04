import axios from 'axios';

const api = axios.create({
    baseURL: '/api'
});

export const getProfessionals = (params) => api.get('/professionals', { params });
export const getProfessional = (id) => api.get(`/professionals/${id}`);
export const createProfessional = (data) => api.post('/professionals', data);
export const updateProfessional = (id, data) => api.put(`/professionals/${id}`, data);
export const deleteProfessional = (id) => api.delete(`/professionals/${id}`);
export const getCategories = () => api.get('/categories');
