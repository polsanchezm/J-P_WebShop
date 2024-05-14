import { isAuthenticatedGuard } from '@/guards/authGuard';
import { setupTokenExpiryGuard } from '@/guards/expiryGuard';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/components/layout/LayoutComponent.vue'),
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/views/auth/UserLoginView.vue')
                },
                {
                    path: '/register',
                    name: 'register',
                    component: () => import('@/views/auth/UserRegisterView.vue')
                },
                {
                    path: '/user',
                    name: 'user',
                    component: () => import('@/components/layout/UserLayout.vue'),
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
                                    name: 'orders.all',
                                    component: () => import('@/views/client/order/UserOrdersView.vue'),
                                    meta: { requiresAuth: true, requiresRoleClient: true }
                                },
                                {
                                    path: 'detail/:id',
                                    name: 'orders.detail',
                                    component: () => import('@/views/client/order/UserOrderDetailView.vue'),
                                    meta: { requiresAuth: true, requiresRoleClient: true }
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
                                    component: () => import('@/views/client/shipping/AllShippingsView.vue'),
                                    meta: { requiresAuth: true, requiresRoleClient: true }
                                },
                                {
                                    path: 'create',
                                    name: 'shipping.create',
                                    component: () => import('@/views/client/shipping/ShippingCreateView.vue'),
                                    meta: { requiresAuth: true, requiresRoleClient: true }
                                },
                                {
                                    path: 'edit/:id',
                                    name: 'shipping.edit',
                                    component: () => import('@/views/client/shipping/ShippingEditView.vue'),
                                    meta: { requiresAuth: true, requiresRoleClient: true }
                                }
                            ]
                        },
                        {
                            path: 'cart',
                            name: 'cart',
                            component: () => import('@/views/client/cart/CartView.vue'),
                            meta: { requiresAuth: true, requiresRoleClient: true }
                        },
                        {
                            path: 'wishlist',
                            name: 'wishlist',
                            component: () => import('@/views/client/wishlist/WishlistView.vue'),
                            meta: { requiresAuth: true, requiresRoleClient: true }
                        },
                        {
                            path: 'payment',
                            name: 'payment',
                            children: [
                                {
                                    path: 'status',
                                    name: 'payment.status',
                                    component: () => import('@/views/client/payment/PaymentStatusView.vue'),
                                    meta: { requiresAuth: true, requiresRoleClient: true }
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/products',
                    children: [
                        {
                            path: '',
                            name: 'products',
                            component: () => import('@/views/client/product/ProductsView.vue')
                        },
                        {
                            path: 'detail/:id',
                            name: 'products.detail',
                            component: () => import('@/views/client/product/ProductDetailView.vue')
                        }
                    ]
                },
                {
                    path: '/management',
                    children: [
                        {
                            path: 'login',
                            name: 'manager.login',
                            component: () => import('@/views/auth/ManagerLoginView.vue')
                        },
                        {
                            path: '',
                            name: 'manager.dashboard',
                            component: () => import('@/views/manager/dashboard/ManagerDashboardView.vue'),
                            meta: { requiresAuth: true, requiresRoleManager: true }
                        },
                        {
                            path: 'products',
                            children: [
                                {
                                    path: '',
                                    name: 'manager.products.all',
                                    component: () => import('@/views/manager/product/ProductsView.vue'),
                                    meta: { requiresAuth: true, requiresRoleManager: true }
                                },
                                {
                                    path: 'add',
                                    name: 'manager.products.add',
                                    component: () => import('@/views/manager/product/AddProductView.vue'),
                                    meta: { requiresAuth: true, requiresRoleManager: true }
                                },
                                {
                                    path: 'detail/:id',
                                    name: 'manager.products.detail',
                                    component: () => import('@/views/manager/product/ProductDetailView.vue'),
                                    meta: { requiresAuth: true, requiresRoleManager: true }
                                },
                                {
                                    path: 'edit/:id',
                                    name: 'manager.products.edit',
                                    component: () => import('@/views/manager/product/EditProductView.vue'),
                                    meta: { requiresAuth: true, requiresRoleManager: true }
                                }
                            ]
                        },
                        {
                            path: 'orders',
                            name: 'manager.orders',
                            component: () => import('@/views/manager/order/OrdersView.vue'),
                            meta: { requiresAuth: true, requiresRoleManager: true }
                        }
                    ]
                },
                {
                    path: '/:pathMatch(.*)*',
                    name: 'error404',
                    component: () => import('@/views/Error404View.vue')
                }
            ]
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    await isAuthenticatedGuard(to, from, next);
    await setupTokenExpiryGuard(to, from, next);
});

export default router;
