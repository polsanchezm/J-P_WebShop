import { useAuthStore } from '@/stores/client/auth';

let interval: any = null;

export const setupTokenExpiryGuard = async (to: any, from: any, next: any) => {
    const authStore = useAuthStore();
    // let count = 0;

    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }

    interval = setInterval(() => {
        // count++;
        // console.log('segundo', count);
        if (authStore.retrieveTokenValue() === null) {
            clearInterval(interval);
            authStore.isLoggedIn = false;
            return next({ name: 'login' }); // Redirigir al login si el token ha expirado
        }
    }, 1000); // Comprobar cada segundo

    return next(); // Continuar con la navegación si aún no se ha detectado expiración
};
