import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL
});

export const getProfessionals = (params) => api.get('/professionals', { params });
export const getProfessional = (id) => api.get(`/professionals/${id}`);
export const createProfessional = (data) => api.post('/professionals', data);
export const updateProfessional = (id, data) => api.put(`/professionals/${id}`, data);
export const deleteProfessional = (id) => api.delete(`/professionals/${id}`);
export const getCategories = () => api.get('/categories');
