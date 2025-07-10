import axios from 'axios';

// Отримуємо URL з змінної середовища
const API_URL = import.meta.env.VITE_API_URL;

export const fetchEvents = () => axios.get(`${API_URL}/api/events`);

export const addEvent = data =>
  axios.post(`${API_URL}/api/events`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

export const deleteEvent = id =>
  axios.delete(`${API_URL}/api/events/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

