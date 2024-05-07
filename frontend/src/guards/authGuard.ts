import { authService } from '@/services/auth/auth';

export const isAuthenticatedGuard = async (to: any, from: any, next: any) => {
    const auth = authService();

    if (!to.meta.requiresAuth) {
        return next();
    } else if (!auth.isLoggedIn.value) {
        return next({ name: 'login' });
    } else {
        console.log(auth.userRole.value);

        if (to.meta.requiresRoleManager && auth.userRole.value !== 'manager') {
            return next({ name: 'home' });
        } else if (to.meta.requiresRoleClient && auth.userRole.value !== 'client') {
            return next({ name: 'manager.dashboard' });
        } else {
            return next();
        }
    }
};
