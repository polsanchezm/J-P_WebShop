import Axios from 'axios';
import { type User } from '@/models/user';

export interface ErrorResponse {
    message: string;
}

export interface ApiResponse {
    token: string;
    message: string;
    user: User;
}

const axios = Axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
    withXSRFToken: true
});

export default axios;
