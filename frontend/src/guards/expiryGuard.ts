import { useVerifyToken } from '@/composables/verifyToken';
import { useAuthStore } from '@/stores/auth/auth';

let interval: any = null;

// Configura el guard de l'expiració del token
export const setupTokenExpiryGuard = (to: any, from: any, next: any) => {
    const auth = useAuthStore();

    // Utilitzem el composable per verificar el token
    const { verifyToken } = useVerifyToken();

    // Si ja hi ha un interval en execució, el neteja
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }

    const checkToken = () => {
        if (verifyToken() === null) {
            console.log('Token expired');
            clearInterval(interval);
            interval = null;
            auth.isLoggedIn = false;
            if (to.name !== 'login' && to.name !== 'manager.login') {
                next({ name: 'login' });
            } else {
                next();
            }
            return false;
        }
        return true;
    };

    // Estableix un nou interval per comprovar regularment si el token ha caducat
    interval = setInterval(checkToken, 10000);

    if (!checkToken()) {
        return;
    }
};
