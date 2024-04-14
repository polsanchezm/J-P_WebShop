import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/components/MainHome.vue')
        },
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
            path: '/user',
            name: 'user',
            children: [
                {
                    path: '/user/detail', // Modificar después
                    name: 'detail',
                    component: () => import('@/views/client/profile/UserDetailView.vue')
                },
                {
                    path: '/user/edit', // Modificar después
                    name: 'edit',
                    component: () => import('@/views/client/profile/UserEditView.vue')
                }
            ]
        }
    ]
});

export default router;
