import Axios from 'axios';
import { type User } from '@/models/user';

export interface ErrorResponse {
    message: string;
    response: any;
}

export interface UserApiResponse {
    token: string;
    message: string;
    user: User;
}

const axios = Axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true,
    withXSRFToken: true
});

export default axios;
