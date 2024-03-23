import axios from 'axios'

axios.defaults.withCredentials = true;

const API = 'http://localhost:8080/api'

export const registerRequest = user => axios.post(`${API}/session/register`, user)
export const loginRequest = user => axios.post(`${API}/session/login`, user)
export const currentRequest = user => axios.get(`${API}/session/current`, user)
export const logout = () => axios.get(`${API}/session/logout`);