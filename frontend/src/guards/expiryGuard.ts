import { useVerifyToken } from '@/composables/verifyToken';
import { useAuthStore } from '@/stores/auth/auth';

let interval: any = null;

// Configura el guard de l'expiració del token
export const setupTokenExpiryGuard = async (to: any, from: any, next: any) => {
    const auth = useAuthStore();

    // Utilitzem el composable per verificar el token
    const { verifyToken } = useVerifyToken();

    // Si ja hi ha un interval en execució, el neteja
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }

    // Estableix un nou interval per comprovar regularment si el token ha caducat
    interval = setInterval(() => {
        if (verifyToken() === null) {
            clearInterval(interval);
            auth.isLoggedIn = false;
            next({ name: 'login' });
        }
    }, 10000);

    // Continua amb la navegació
    next();
};
