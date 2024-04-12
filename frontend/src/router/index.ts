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
        }
    ]
});

export default router;
