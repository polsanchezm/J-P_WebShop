import { useAuthStore } from '@/stores/client/auth';

export const isAuthenticatedGuard = async (to: any, from: any, next: any) => {
    const authStore = useAuthStore();

    if (!to.meta.requiresAuth) {
        return next();
    } else {
        if (to.meta.role === 'manager') {
            return next({ name: 'manager.login' });
        } else {
            if (!authStore.isLoggedIn) {
                return next({ name: 'login' });
            } else {
                return next();
            }
        }
    }
};
