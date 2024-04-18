import { isAuthenticatedGuard } from '@/guards/authGuard';
import { setupTokenExpiryGuard } from '@/guards/expiryGuard';
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
            // redirect: '/user/detail',
            children: [
                {
                    path: '',
                    name: 'user.detail',
                    component: () => import('@/views/client/profile/UserDetailView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'edit',
                    name: 'user.edit',
                    component: () => import('@/views/client/profile/UserEditView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'shipping',
                    name: 'shipping',
                    children: [
                        {
                            path: '',
                            name: 'shipping.all',
                            component: () => import('@/views/client/profile/shipping/AllShippingsView.vue'),
                            meta: { requiresAuth: true }
                        },
                        {
                            path: 'create',
                            name: 'shipping.create',
                            component: () => import('@/views/client/profile/shipping/ShippingCreateView.vue'),
                            meta: { requiresAuth: true }
                        },
                        {
                            path: 'edit/:id',
                            name: 'shipping.edit',
                            component: () => import('@/views/client/profile/shipping/ShippingEditView.vue'),
                            meta: { requiresAuth: true }
                        },
                        {
                            path: 'delete/:id',
                            name: 'shipping.delete',
                            component: () => import('@/components/client/profile/shipping/ShippingDelete.vue'),
                            meta: { requiresAuth: true }
                        }
                    ]
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'error404',
            component: () => import('@/views/Error404View.vue')
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    await isAuthenticatedGuard(to, from, next);
    await setupTokenExpiryGuard(to, from, next);
});

export default router;
