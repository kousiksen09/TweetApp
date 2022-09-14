import axios from 'axios';

export const axios_instance = axios.create({
  headers: {
    //'Content-Type': '*/*',
   //'Content-Type': 'multipart/form-data',
   'content-type': 'multipart/form-data',
    Pragma: 'no-cache',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
});

// export const BaseURL = 'https://20.244.76.63/gateway';

export const BaseURL = 'http://20.219.225.7/gateway';

