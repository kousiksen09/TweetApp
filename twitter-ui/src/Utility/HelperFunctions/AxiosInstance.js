import axios from 'axios';

export const axios_instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Pragma: 'no-cache',
  },
});

export const BaseURL = 'http://localhost:5666/gateway';
