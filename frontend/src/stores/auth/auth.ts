import { useVerifyToken } from '@/composables/verifyToken';
import type { LoginData } from '@/models/login';
import type { Register } from '@/models/register';
import type { User } from '@/models/user';
import type { VerifyUser } from '@/models/verifyUser';
import router from '@/router';
import { authService } from '@/services/auth/auth';
import type { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const authServ = authService();
    const { setWithExpiry } = useVerifyToken();
    const user = ref<User | null>(null);
    const userRole = ref<string | null>(localStorage.getItem('userRole'));
    const isLoggedIn = ref(!!localStorage.getItem('token'));

    const registerUser = async (user: Register) => {
        try {
            // Obté la resposta de la crida a l'API per a registrar l'usuari
            const registerResponse = await authServ.userRegister(user);

            if (registerResponse.status == 201 && registerResponse.data.token) {
                // Aplicar expiració al token
                setWithExpiry(registerResponse.data.token);
                localStorage.setItem('userRole', registerResponse.data.user.role);
                isLoggedIn.value = true;

                // Porta al Home
                router.push({ name: 'home' });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            // Mostrar errors en cas que no es pugui retornar les dades
            console.error('Error al fer register:', errorMessage);
        }
    };

    const loginUser = async (user: LoginData) => {
        try {
            // Obté la resposta de la crida a l'API per a fer login
            const loginResponse = await authServ.userLogin(user);

            if (loginResponse.status == 200 && loginResponse.data.token) {
                // Aplicar expiració al token
                setWithExpiry(loginResponse.data.token);

                // Desa el rol de l'usuari al LocalStorage
                localStorage.setItem('userRole', loginResponse.data.user.role);
                isLoggedIn.value = true;

                // Desa el rol de l'usuari a la variable
                userRole.value = loginResponse.data.user.role;

                // Porta al Home o Manager Dashboard segons el rol
                router.push({ name: loginResponse.data.user.role === 'user' ? 'home' : 'manager.dashboard' });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            // Mostrar errors en cas que no pugui retornar les dades
            console.error('Error al fer login:', errorMessage);
        }
    };

    const logoutUser = async () => {
        try {
            // Obté resposta de la crida a l'API per fer logout
            const logoutResponse = await authServ.userLogout();

            if (logoutResponse.status == 200) {
                isLoggedIn.value = false;

                // Canvia el valor de la variable a null
                userRole.value = null;

                // Elimina el token i el rol d'usuari del LocalStorage
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');

                // Porta al Home
                router.push({ name: 'home' });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            // mostrem els error en cas que no pugui retornar les dades
            console.error('Error al fer logout:', errorMessage.message);
        }
    };

    const detailUser = async () => {
        try {
            // Obté resposta de la crida a l'API pels detalls de l'usuari
            const detailResponse = await authServ.userDetail();

            if (detailResponse.status == 200) {
                user.value = detailResponse.data;
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            // Mostrar errors en cas que no pugui retornar les dades
            console.error('Error en obtenir el detail:', errorMessage.message);
        }
    };

    const editUser = async (user: VerifyUser) => {
        try {
            // Obté resposta de la crida a l'API per verificar les credencials de l'usuari
            const credentialResponse = await authServ.userCredentrials(user);

            if (credentialResponse.status == 200) {
                // Obté resposta de la crida a l'API per editar les dades de l'usuari
                const editResponse = await authServ.userEdit(user);
                if (editResponse.status == 200) {
                    // Porta a la ruta de detall d'usuari
                    router.push({ name: 'user.detail' });
                }
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            // Mostrar errors en cas que no pugui retornar les dades
            console.error('Error al fer edit:', errorMessage);
        }
    };

    const deleteUser = async () => {
        try {
            // Obté resposta de la crida a l'API per eliminar l'usuari
            const response = await authServ.userDelete();

            if (response.status == 200) {
                isLoggedIn.value = false;

                // Canvia el valor de la variable a null
                userRole.value = null;

                // Elimina el token i el rol d'usuari del LocalStorage
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');

                // Porta al Home
                router.push({ name: 'home' });
            }
        } catch (error) {
            const errorMessage = error as AxiosError;
            // Mostrar errors en cas que no pugui retornar les dades
            console.error('Error al fer edit:', errorMessage);
        }
    };

    return { registerUser, loginUser, logoutUser, detailUser, editUser, isLoggedIn, userRole, user, deleteUser };
});
