import { useVerifyToken } from '@/composables/verifyToken';
import { useAuthStore } from '@/stores/auth/auth';

let interval: any = null;

export const setupTokenExpiryGuard = (to: any, from: any, next: any) => {
    const auth = useAuthStore();
    const { verifyToken } = useVerifyToken();
    // Clear existing interval if any
    if (interval !== null) {
        clearInterval(interval);
        interval = null;
    }

    // Function to check token validity
    const checkToken = () => {
        if (verifyToken() === null) {
            console.log('Token expired');
            clearInterval(interval);
            interval = null;
            auth.isLoggedIn = false;
            if (to.name !== 'login' && to.name !== 'manager.login') {
                next({ name: 'login' });
            } else {
                console.log('not login', to.name);
                next();
            }
            console.log('token null');
            return false;
        }
        console.log('token not null');
        return true;
    };

    // Start token check interval
    interval = setInterval(checkToken, 10000);

    // Immediately check token on setup
    if (!checkToken()) {
        return;
    }
};
