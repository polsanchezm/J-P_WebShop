import { useAuthStore } from '@/stores/auth/auth';

export const isAuthenticatedGuard = async (to: any, from: any, next: any) => {
    console.log('isAuthenticatedGuard start');
    const auth = useAuthStore();

    if (!to.meta.requiresAuth) {
        console.log('No auth required');
        next();
    } else if (!auth.isLoggedIn) {
        console.log('Not logged in');
        next({ name: 'login' });
    } else if (to.meta.requiresRoleManager && auth.userRole !== 'manager') {
        console.log('Role manager required');
        next({ name: 'home' });
    } else if (to.meta.requiresRoleClient && auth.userRole !== 'client') {
        console.log('Role client required');
        next({ name: 'manager.dashboard' });
    } else {
        console.log('Authenticated and authorized');
        next();
    }
};
