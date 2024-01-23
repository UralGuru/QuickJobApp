import axios from 'axios';
import { LoginAuth, RegisAuth } from '../constatnts/types';
import $api from './instance';

const login = async (data: LoginAuth) => {
    console.log(data);
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    const response = await axios.post(`http://51.250.93.99:5555/auth/login`, formData);
console.log(response);
    return response.data;
};

const registration = async (data: RegisAuth) => {
    const responseReg = await $api.post(`/api/registration/request`, data);
    const responseConf = await $api.post(`/api/registration/confirm`, {
        userFormId: responseReg.data.userFormId,
        code: '0000',
    });
    return responseConf.data;
};
const logout = async () => {
    const response = await $api.post(`/api/auth/logout`);

    return response.data;
};

const getUser = async (id: string) => {
    const response = await axios.get(`http://51.250.93.99:4444/UserInfo/base?userId=${id}`);
    return response.data;
};

const AuthService = {
    login,
    registration,
    getUser,
    logout,
};

export default AuthService;
