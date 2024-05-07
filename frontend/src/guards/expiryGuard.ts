import { useVerifyToken } from '@/composables/verifyToken';
import { authService } from '@/services/auth/auth';

let interval: any = null;

export const setupTokenExpiryGuard = async (to: any, from: any, next: any) => {
    const auth = authService();
    const { verifyToken } = useVerifyToken();

    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }

    interval = setInterval(() => {
        if (verifyToken() === null) {
            clearInterval(interval);
            auth.isLoggedIn.value = false;
            return next({ name: 'login' }); // Redirigir al login si el token ha expirado
        }
    }, 10000); // Comprobar cada 10 segundos

    return next(); // Continuar con la navegación si aún no se ha detectado expiración
};
