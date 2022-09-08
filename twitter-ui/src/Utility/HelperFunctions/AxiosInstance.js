import axios from 'axios';

export const axios_instance = axios.create({
  headers: {
    //'Content-Type': '*/*',
   //'Content-Type': 'multipart/form-data',
   'content-type': 'multipart/form-data',
    Pragma: 'no-cache',
  },
});

export const BaseURL = 'http://localhost:5503/gateway';
