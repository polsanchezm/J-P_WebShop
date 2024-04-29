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
                    path: 'orders',
                    children: [
                        {
                            path: '',
                            name: 'orders',
                            component: () => import('@/views/client/profile/UserOrdersView.vue')
                        },
                        {
                            path: 'detail/:id',
                            name: 'orderDetail',
                            component: () => import('@/views/client/profile/UserOrderDetailView.vue')
                        }
                    ]
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
                        }
                    ]
                },
                {
                    path: 'cart',
                    name: 'cart',
                    component: () => import('@/views/client/cart/CartView.vue'),
                    meta: { requiresAuth: true }
                },
                {
                    path: 'wishlist',
                    name: 'wishlist',
                    component: () => import('@/views/client/wishlist/WishlistView.vue'),
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: '/products',
            children: [
                {
                    path: '',
                    name: 'products',
                    component: () => import('@/views/product/ProductsView.vue')
                },
                {
                    path: 'detail/:id',
                    name: 'productDetail',
                    component: () => import('@/views/product/ProductDetailView.vue')
                }
            ]
        },
        {
            path: '/management',
            name: 'management',
            children: [
                {
                    path: 'products',
                    children: [
                        {
                            path: '',
                            name: 'products.manager',
                            component: () => import('@/views/manager/ProductsView.vue'),
                            meta: { requiresAuth: true }
                        },
                        {
                            path: 'add',
                            name: 'product.add',
                            component: () => import('@/views/manager/AddProductView.vue'),
                            meta: { requiresAuth: true }
                        },
                        {
                            path: 'detail/:id',
                            name: 'product.detail.manager',
                            component: () => import('@/views/manager/ProductDetailView.vue'),
                            meta: { requiresAuth: true }
                        },
                        {
                            path: 'edit/:id',
                            name: 'product.edit',
                            component: () => import('@/views/manager/EditProductView.vue'),
                            meta: { requiresAuth: true }
                        }
                    ]
                },
                {
                    path: 'orders',
                    name: 'orders.manager',
                    component: () => import('@/views/manager/OrdersView.vue'),
                    meta: { requiresAuth: true }
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
