import { useAuthStore } from '@/stores/auth/auth';

// Guard per verificar si l'usuari està autenticat
export const isAuthenticatedGuard = async (to: any, from: any, next: any) => {
    const auth = useAuthStore();
    // Comprovem si la ruta no requereix autenticació, en aquest cas deixa passar
    if (!to.meta.requiresAuth) {
        next();

    // Comprovem si l'usuari no ha iniciat sessió, si és així, el redirigim a la pàgina de login
    } else if (!auth.isLoggedIn) {
        next({ name: 'login' });
    /**
     * Comprovem si la ruta requereix el rol de manager, i si l'usuari no té aquest rol, 
     * el redirigim a la pàgina principal 
     */
    } else if (to.meta.requiresRoleManager && auth.userRole !== 'manager') {
        next({ name: 'home' });
    /**
     * Comprovem si la ruta requereix el rol de client, i si l'usuari no té aquest rol, 
     * el redirigim al dashboard del manager
     */
    } else if (to.meta.requiresRoleClient && auth.userRole !== 'client') {
        next({ name: 'manager.dashboard' });
        
    // Si tot està correcte, deixa passar
    } else {
        next();
    }
};
