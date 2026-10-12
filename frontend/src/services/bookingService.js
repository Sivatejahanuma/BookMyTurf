import api from './api';

export const createBooking = async (data) => {
  const response = await api.post('/bookings/create', data);
  return response.data;
};

export const getCustomerHistory = async () => {
  const response = await api.get('/bookings/customer/history');
  return response.data;
};

export const getOwnerRequests = async () => {
  const response = await api.get('/bookings/owner/requests');
  return response.data;
};

export const acceptBooking = async (bookingId) => {
  const response = await api.put(`/bookings/${bookingId}/accept`);
  return response.data;
};

export const rejectBooking = async (bookingId) => {
  const response = await api.put(`/bookings/${bookingId}/reject`);
  return response.data;
};

export const cancelBooking = async (bookingId) => {
  const response = await api.put(`/bookings/${bookingId}/cancel`);
  return response.data;
};

export const getBookingDetails = async (bookingId) => {
  const response = await api.get(`/bookings/${bookingId}`);
  return response.data;
};