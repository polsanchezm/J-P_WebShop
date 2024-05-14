import { useVerifyToken } from '@/composables/verifyToken';
import { useAuthStore } from '@/stores/auth/auth';

let interval: any = null;

export const setupTokenExpiryGuard = async (to: any, from: any, next: any) => {
    const auth = useAuthStore();
    const { verifyToken } = useVerifyToken();

    if (interval !== null) {
        console.log('Clearing existing interval');
        clearInterval(interval);
        interval = null;
    }

    interval = setInterval(() => {
        console.log('Checking token expiry');
        if (verifyToken() === null) {
            console.log('Token expired');
            clearInterval(interval);
            interval = null;
            auth.isLoggedIn = false;
            next({ name: 'login' });
        }
    }, 10000);

    console.log('setupTokenExpiryGuard end');
    next();
};
