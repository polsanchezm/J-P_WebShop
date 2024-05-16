import { useAuthStore } from '@/stores/auth/auth';

export const isAuthenticatedGuard = (to: any, from: any, next: any) => {
    const auth = useAuthStore();

    if (!to.meta.requiresAuth) {
        next();
    } else if (!auth.isLoggedIn) {
        next({ name: 'login' });
    } else if (to.meta.requiresRoleManager && auth.userRole !== 'manager') {
        next({ name: 'home' });
    } else if (to.meta.requiresRoleClient && auth.userRole !== 'client') {
        next({ name: 'manager.dashboard' });
    } else {
        next();
    }
};
