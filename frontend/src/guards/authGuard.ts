import { authService } from '@/services/auth/auth';

export const isAuthenticatedGuard = async (to: any, from: any, next: any) => {
    const auth = authService();

    if (!to.meta.requiresAuth) {
        return next();
    }
    if (!auth.isLoggedIn.value) {
        return next({ name: 'login' });
    }
    if (to.meta.requiresRoleManager && auth.userRole.value !== 'manager') {
        return next({ name: 'home' });
    }
    if (to.meta.requiresRoleClient && auth.userRole.value !== 'client') {
        return next({ name: 'manager.dashboard' });
    } else {
        return next();
    }
};
