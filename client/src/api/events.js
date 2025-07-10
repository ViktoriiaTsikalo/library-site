import axios from 'axios';

export const fetchEvents = () => axios.get('http://localhost:3000/api/events');

export const addEvent = data =>
  axios.post('http://localhost:3000/api/events', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

export const deleteEvent = id =>
  axios.delete(`http://localhost:3000/api/events/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
