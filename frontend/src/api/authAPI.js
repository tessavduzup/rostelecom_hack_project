import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:3001/api'
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export async function loginUser(username, password) {
    try {
        const response = await API.post('/auth/login', { username, password });
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Ошибка авторизации')
    }
}

export async function registerUser(userData) {
    try {
        const response = await API.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Ошибка регистрации');
    }
}