import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/client/UserLoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/client/UserRegisterView.vue')
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('@/components/client/UserLogout.vue')
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/components/MainHome.vue')
        },

        // Detail & Edit added
        {
            path: '/detail', // Modificar después
            name: 'detail',
            component: () => import('@/views/client/profile/UserDetailView.vue')
        },
        {
            path: '/edit', // Modificar después
            name: 'edit',
            component: () => import('@/views/client/profile/UserEditView.vue')
        },
    ]
});

export default router;
