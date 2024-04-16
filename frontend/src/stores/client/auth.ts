import { defineStore } from 'pinia';
import axios, { type ErrorResponse, type ApiResponse } from '@/lib/axios';
import router from '@/router';
import { ref } from 'vue';
import { type User } from '@/models/user';
export const useAuthStore = defineStore('user', () => {
    const user = ref<User | null>(null);
    const isLoggedIn = ref(!!localStorage.getItem('token'));
    console.log('init', isLoggedIn.value);

    const userRegister = async (user: any) => {
        try {
            // fem una crida a la api
            const response = await axios.post<ApiResponse>('/auth/register', {
                name: user.name,
                surnames: user.surnames,
                email: user.email,
                birthdate: user.birthdate,
                password: user.currentPassword,
                password_confirmation: user.currentPasswordConfirmation
            });

            if (response.status == 201) {
                router.push({ path: '/login' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al fer register:', errorMessage.message);
        }
    };

    const userLogin = async (user: any) => {
        console.log(user);
        try {
            // fem una crida a la api
            const response = await axios.post<ApiResponse>('/auth/login', {
                email: user.email,
                password: user.currentPassword
            });

            if (response.status == 200 && response.data.token) {
                setWithExpiry(response.data.token);
                console.log(response.data.token);

                isLoggedIn.value = true;
                router.push({ path: '/' });
            }
            console.log('login', isLoggedIn.value);
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al fer login:', errorMessage.message);
        }
    };

    const userLogout = async () => {
        try {
            // const getToken = localStorage.getItem('token');
            const getToken = retrieveTokenValue();
            console.log(getToken);

            // fem una crida a la api
            const response = await axios.post<ApiResponse>('/auth/users/logout', null, {
                headers: {
                    Authorization: `Bearer ${getToken}`
                }
            });
            isLoggedIn.value = false;

            if (response.status == 200) {
                localStorage.removeItem('token');
                router.push({ path: '/login' });
            }
            console.log('logout', isLoggedIn.value);
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al fer logout:', errorMessage.message);
        }
    };

    const userDetail = async () => {
        try {
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);

            // fem una crida a la api
            const response = await axios.get('/auth/users/detail', {
                headers: {
                    Authorization: `Bearer ${tokenObj.value}`
                }
            });

            if (response.status == 200) {
                user.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error en obtenir el detail:', errorMessage.message);
        }
    };

    const userEdit = async (user: any) => {
        try {
            const tokenString = localStorage.getItem('token');

            if (tokenString === null) {
                // No hay token disponible, maneja esta situación adecuadamente
                console.error('No token found in localStorage.');
                return null; // Salimos de la función si no hay token
            }

            const tokenObj = JSON.parse(tokenString);
            const verificationResponse = await axios.post<ApiResponse>(
                '/auth/users/verify-credentials',
                {
                    email: user.email,
                    password: user.currentPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenObj.value}`
                    }
                }
            );

            if (verificationResponse.status === 200) {
                // fem una crida a la api
                const response = await axios.post<ApiResponse>(
                    '/auth/users/update',
                    {
                        name: user.name,
                        surnames: user.surnames,
                        email: user.email,
                        birthdate: user.birthdate,
                        password: user.newPassword,
                        password_confirmation: user.newPasswordConfirmation
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${tokenObj.value}`
                        }
                    }
                );

                if (response.status == 200) {
                    router.push({ path: '/user/detail' });
                }
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al fer edit:', errorMessage.message);
        }
    };

    function setWithExpiry(value: any) {
        const now = new Date();
        const ttl = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
        const item = {
            value: value,
            expiry: now.getTime() + ttl
        };
        localStorage.setItem('token', JSON.stringify(item));
    }

    function retrieveTokenValue() {
        const tokenString = localStorage.getItem('token');
        if (!tokenString) {
            return null;
        }

        const tokenObj = JSON.parse(tokenString);
        const now = new Date();

        if (now.getTime() > tokenObj.expiry) {
            localStorage.removeItem('token');
            return null;
        }

        return tokenObj.value;
    }

    function checkTokenExpiry() {
        let count = 0;
        const interval = setInterval(() => {
            count++;
            // console.log('segundo', count);

            if (retrieveTokenValue() === null) {
                // console.log('Token expirado, cerrando sesión');
                isLoggedIn.value = false;
            }
        }, 1000);
        return () => clearInterval(interval);
    }

    return { userRegister, userLogin, userLogout, userDetail, userEdit, isLoggedIn, user, setWithExpiry, retrieveTokenValue, checkTokenExpiry };
});
