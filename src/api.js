import axios from 'axios';

const api = axios.create({
    baseURL: 'https://time-clock-310222.ue.r.appspot.com'
});

export default api;