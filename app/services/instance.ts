import axios from 'axios';
// import { AuthResponse } from '../models/interfaces';

export const API_URL = 'http://51.250.93.99';
// export const API_URL = '/api';

const $api = axios.create({
    withCredentials: true,
});

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken',) || "0000"}`;
    return config;
});

$api.interceptors.response.use(
    config => {
        return config;
    },
    async error => {
        console.log(error);
        const originalRequest = error.config;
        if (error.response.status == 401 && error.config && !error._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.post(`api/auth/token/refresh`, {
                    withCredentials: true,
                });
                localStorage.setItem('accessToken', response.data.accessToken);
                return $api.request(originalRequest);
            } catch (error) {
                console.log('Not authorized');
            }
        }
        throw error;
    },
);

export default $api;
