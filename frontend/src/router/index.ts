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
                    path: 'detail',
                    name: 'detail',
                    component: () => import('@/views/client/profile/UserDetailView.vue')
                },
                {
                    path: 'edit',
                    name: 'edit',
                    component: () => import('@/views/client/profile/UserEditView.vue')
                },
                {
                    path: 'orders',
                    children: [
                        {
                            path: '',
                            name: 'orders',
                            component: () => import('@/views/client/profile/UserOrdersView.vue'),
                        },
                        {
                            path: 'detail/:id',
                            name: 'orderDetail',
                            component: () => import('@/views/client/profile/UserOrderDetailView.vue')
                        }
                    ]
                },
            ]
        },
    ]
});

export default router;
