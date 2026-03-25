import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
});

export const submitLead    = (data)  => API.post('/contact', data);
export const fetchProjects = ()      => API.get('/projects');
export const fetchLogs     = (n=20)  => API.get(`/logs?limit=${n}`);
export const healthCheck   = ()      => API.get('/health');

export default API;
