import axios from 'axios';

const accessToken = localStorage.getItem('accessToken') || '';

export const instance = axios.create({
  headers: {
    Authorization: `Bearer ${JSON.parse(accessToken)}`,
  },
});
