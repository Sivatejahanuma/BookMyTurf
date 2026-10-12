import api from './api';

export const getAvailableSlots = async (turfId, date) => {
  const response = await api.get(`/slots/${turfId}`, { params: { date } });
  return response.data;
};