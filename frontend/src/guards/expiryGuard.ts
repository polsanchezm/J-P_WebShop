import { useVerifyToken } from '@/composables/verifyToken';
import { useAuthStore } from '@/stores/auth/auth';

let interval: any = null;
let nextCalled = false;

export const setupTokenExpiryGuard = (to: any, from: any, next: any) => {
    const auth = useAuthStore();
    const { verifyToken } = useVerifyToken();

    if (interval !== null) {
        console.log('Clearing existing interval');
        clearInterval(interval);
        interval = null;
    }

    nextCalled = false; // Reset the flag

    interval = setInterval(() => {
        console.log('Checking token expiry');
        if (verifyToken() === null) {
            console.log('Token expired');
            clearInterval(interval);
            interval = null;
            auth.isLoggedIn = false;
            if (!nextCalled) {
                nextCalled = true;
                next({ name: 'login' });
            }
        }
    }, 10000);

    console.log('setupTokenExpiryGuard end');
    if (!nextCalled) {
        nextCalled = true;
        next();
    }
};
