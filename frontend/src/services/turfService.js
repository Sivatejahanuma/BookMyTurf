import api from './api';

export const addTurf = async (data) => {
  const response = await api.post('/turfs/owner/add', data);
  return response.data;
};

export const getAllTurfs = async () => {
  const response = await api.get('/turfs/all');
  return response.data;
};

export const getTurfById = async (id) => {
  const response = await api.get(`/turfs/${id}`);
  return response.data;
};

export const searchTurfs = async (keyword) => {
  const response = await api.get('/turfs/search', { params: { keyword } });
  return response.data;
};

export const searchByLocation = async (location) => {
  const response = await api.get('/turfs/search/location', { params: { location } });
  return response.data;
};

export const getOwnerTurfs = async () => {
  const response = await api.get('/turfs/owner/my-turfs');
  return response.data;
};

export const updateTurf = async (turfId, data) => {
  const response = await api.put(`/turfs/owner/${turfId}`, data);
  return response.data;
};