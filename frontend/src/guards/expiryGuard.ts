import { useVerifyToken } from '@/composables/verifyToken';
import { useAuthStore } from '@/stores/auth/auth';

let interval: any = null;

export const setupTokenExpiryGuard = async (to: any, from: any, next: any) => {
    const auth = useAuthStore();
    const { verifyToken } = useVerifyToken();

    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }

    interval = setInterval(() => {
        if (verifyToken() === null) {
            clearInterval(interval);
            auth.isLoggedIn = false;
            next({ name: 'login' }); // Redirigir al login si el token ha expirado
        }
    }, 10000); // Comprobar cada 10 segundos

    next(); // Continuar con la navegación si aún no se ha detectado expiración
};
