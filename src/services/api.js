import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;

const fipeApi = axios.create({
  baseURL: 'https://parallelum.com.br/fipe/api/v1',
});
