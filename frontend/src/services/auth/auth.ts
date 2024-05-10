import axios, { type UserApiResponse } from '@/lib/axios';
import { useVerifyToken } from '@/composables/verifyToken';
import type { LoginData } from '@/models/login';
import type { Register } from '@/models/register';
import type { UserEdit } from '@/models/edit';

export function authService() {
    const { verifyToken } = useVerifyToken();

    const userRegister = async (user: Register) => {
        // Crida a l'API per a registrar l'usuari
        const response = await axios.post<UserApiResponse>('/auth/register', {
            name: user.name,
            surnames: user.surnames,
            email: user.email,
            birthdate: user.birthdate,
            password: user.currentPassword,
            password_confirmation: user.currentPasswordConfirmation
        });

        return response;
    };

    const userLogin = async (user: LoginData) => {
        // Crida a l'API per a fer login
        const response = await axios.post<UserApiResponse>('/auth/login', {
            email: user.email,
            password: user.currentPassword
        });

        return response;
    };

    const userLogout = async () => {
        const userToken = verifyToken();

        // Crida a l'API per a fer logout
        const response = await axios.post<UserApiResponse>('/auth/users/logout', null, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response;
    };

    const userDetail = async () => {
        const userToken = verifyToken();

        // Crida a l'API per a obtenir els detalls de l'usuari loguejat
        const response = await axios.get('/auth/users/detail', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response;
    };

    const userCredentrials = async (user: LoginData) => {
        const userToken = verifyToken();

        /**
         * Crida a l'API per verificar les credencials de l'usuari
         * loguejat abans de modificar les seves dades
         */

        const response = await axios.post<UserApiResponse>(
            '/auth/users/verify-credentials',
            {
                email: user.email,
                password: user.currentPassword
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        );
        return response;
    };

    const userEdit = async (user: UserEdit) => {
        const userToken = verifyToken();

        // Crida a l'API per actualitzar les dades de l'usuari loguejat
        const response = await axios.post<UserApiResponse>(
            '/auth/users/update',
            {
                name: user.name,
                surnames: user.surnames,
                email: user.email,
                password: user.newPassword,
                password_confirmation: user.newPasswordConfirmation
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        );

        return response;
    };

    const userDelete = async () => {
        const userToken = verifyToken();

        // Crida a l'API per actualitzar les dades de l'usuari loguejat
        const response = await axios.delete<UserApiResponse>('/auth/users/delete', {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        return response;
    };

    return { userRegister, userLogin, userLogout, userDetail, userEdit, userCredentrials, userDelete };
}
