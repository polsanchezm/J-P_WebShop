import { defineStore } from 'pinia';
import axios, { type ErrorResponse, type ApiResponse } from '@/lib/axios';
import router from '@/router';
import { ref } from 'vue';
import { type User } from '@/models/user';
export const useUserStore = defineStore('user', () => {
    const user = ref<User>({
        id: 0,
        name: '',
        surnames: '',
        birthdate: null,
        email: ''
    });

    const isLoggedIn = ref(!!localStorage.getItem('token'));
    console.log('init', isLoggedIn.value);

    const userRegister = async (userName: string, userSurnames: string, userEmail: string, userPassword1: string, userPassword2: string) => {
        try {
            // fem una crida a la api
            const response = await axios.post<ApiResponse>('/auth/register', {
                name: userName,
                surnames: userSurnames,
                email: userEmail,
                password: userPassword1,
                password_confirmation: userPassword2
            });
            // const user: User = response.data.user;
            // console.log('Data', response.data);
            // console.log('Server message:', response.data.message, 'UserName:', user.name, 'UserSurnames:', user.surnames, 'UserBirth:', user.birthdate, 'UserId:', user.id, 'UserEmail:', user.email);

            if (response.status == 201) {
                router.push({ path: '/login' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al fer register:', errorMessage.message);
        }
    };

    const userLogin = async (userEmail: string, userPassword: string) => {
        try {
            // fem una crida a la api
            const response = await axios.post<ApiResponse>('/auth/login', {
                email: userEmail,
                password: userPassword
            });

            if (response.status == 200 && response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log(response.data.token);

                isLoggedIn.value = true;
                router.push({ path: '/home' });
            }
            console.log('login', isLoggedIn.value);
            //     const user: User = response.data.user;
            //     console.log('Data', response.data);
            //     console.log('Server message:', response.data.message, 'UserName:', user.name, 'UserSurnames:', user.surnames, 'UserBirth:', user.birthdate, 'UserId:', user.id, 'UserEmail:', user.email);
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al fer login:', errorMessage.message);
        }
    };

    const userLogout = async () => {
        try {
            const getToken = localStorage.getItem('token');
            // fem una crida a la api
            const response = await axios.post('/auth/users/logout', null, {
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


    // Detail & Edit added

    const userDetail = async () => {
        try {
            const getToken = localStorage.getItem('token');
            // fem una crida a la api
            const response = await axios.get('/auth/users/detail', {
                headers: {
                    Authorization: `Bearer ${getToken}`
                }
            });

            if (response.status == 200) {
                const data = response.data.data
                user.value.id = data.id
                user.value.name = data.name
                user.value.surnames = data.surnames
                user.value.birthdate = data.birthdate
                user.value.email = data.email
                console.log('Datos obtenidos')
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error en obtenir el detail:', errorMessage.message);
        }
    }

    const userEdit = async (userName: string, userSurnames: string, userEmail: string, userBirthdate: Date | null, userPassword1: string, userPassword2: string) => {
        try {
            const getToken = localStorage.getItem('token');
            // fem una crida a la api
            const response = await axios.post('/auth/users/update', {
                name: userName,
                surnames: userSurnames,
                email: userEmail,
                birthdate: userBirthdate,
                password: userPassword1,
                password_confirmation: userPassword2
            }, {
                headers: {
                    Authorization: `Bearer ${getToken}`
                }
            });

            if (response.status == 200) {
                console.log('ok...')
                router.push({ path: '/detail' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al fer edit:', errorMessage.message);
        }
    };

    return { userRegister, userLogin, userLogout, userDetail, userEdit, isLoggedIn, user };
});