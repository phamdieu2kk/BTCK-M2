import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true, // Quan trọng nếu bạn dùng session/cookie
});

export default api;
