import axios, { type ErrorResponse, type UserApiResponse } from '@/lib/axios';
import router from '@/router';
import { ref } from 'vue';
import { type User } from '@/models/user';
import { useVerifyToken } from '@/composables/verifyToken';

export function authService() {
    const user = ref<User | null>(null);
    const userRole = ref<string | null>(localStorage.getItem('userRole'));
    const { verifyToken, setWithExpiry } = useVerifyToken();
    const isLoggedIn = ref(!!localStorage.getItem('token'));
    console.log('init', isLoggedIn.value);

    const userRegister = async (user: any) => {
        try {
            // Crida a l'API per a registrar l'usuari
            const response = await axios.post<UserApiResponse>('/auth/register', {
                name: user.name,
                surnames: user.surnames,
                email: user.email,
                birthdate: user.birthdate,
                password: user.currentPassword,
                password_confirmation: user.currentPasswordConfirmation
            });

            if (response.status == 201 && response.data.token) {
                // Aplicar expiració al token
                setWithExpiry(response.data.token);
                localStorage.setItem('userRole', response.data.user.role);
                isLoggedIn.value = true;

                // Porta al Home
                router.push({ name: 'home' });
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // Mostrar errors en cas que no es pugui retornar les dades
            console.error('Error al fer register:', errorMessage);
        }
    };


    const userLogin = async (user: any) => {
        try {
            // Crida a l'API per a fer login
            const response = await axios.post<UserApiResponse>('/auth/login', {
                email: user.email,
                password: user.currentPassword
            });

            if (response.status == 200 && response.data.token) {
                // Aplicar expiració al token
                setWithExpiry(response.data.token);

                // Desa el rol de l'usuari al LocalStorage
                localStorage.setItem('userRole', response.data.user.role);

                isLoggedIn.value = true;

                // Desa el rol de l'usuari a la variable
                userRole.value = response.data.user.role;

                console.log(userRole.value);

                // Porta al Home o Manager Dashboard segons el rol
                router.push({ name: response.data.user.role === 'user' ? 'home' : 'manager.dashboard' });
            }
            console.log('login', isLoggedIn.value);
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // Mostrar errors en cas que no pugui retornar les dades
            console.error('Error al fer login:', errorMessage);
        }
    };


    const userLogout = async () => {
        try {
            const userToken = verifyToken();

            // Crida a l'API per a fer logout
            const response = await axios.post<UserApiResponse>('/auth/users/logout', null, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status == 200) {
                isLoggedIn.value = false;

                // Canvia el valor de la variable a null
                userRole.value = null;

                // Elimina el roken i el rol d'usuari del LocalStorage
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');

                // Porta al Home
                router.push({ name: 'home' });
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
            const userToken = verifyToken();

            // Crida a l'API per a obtenir els detalls de l'usuari loguejat
            const response = await axios.get('/auth/users/detail', {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });

            if (response.status == 200) {
                user.value = response.data;
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // Mostrar errors en cas que no pugui retornar les dades
            console.error('Error en obtenir el detail:', errorMessage.message);
        }
    };

    
    const userEdit = async (user: any) => {
        console.log(user);

        try {
            const userToken = verifyToken();

            /* 
            Crida a l'API per verificar les credencials de l'usuari loguejat
            abans de modificar les seves dades 
            */
            const verificationResponse = await axios.post<UserApiResponse>(
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

            if (verificationResponse.status === 200) {
                // Crida a l'API per actualitzar les dades de l'usuari loguejat
                const response = await axios.post<UserApiResponse>(
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
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                );

                if (response.status == 200) {
                    // Porta a la ruta de detall d'usuari
                    router.push({ name: 'user.detail' });
                }
            }
        } catch (error) {
            const errorMessage = error as ErrorResponse;
            // Mostrar errors en cas que no pugui retornar les dades
            console.error('Error al fer edit:', errorMessage);
        }
    };

    return { userRegister, userLogin, userLogout, userDetail, userEdit, isLoggedIn, user, userRole };
}
