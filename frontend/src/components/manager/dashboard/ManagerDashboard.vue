<template>
    <section>
        <div class="flex flex-col w-full min-h-screen bg-gray-50 pt-10 items-center mt-16">
            <div class="w-full bg-gray-400 dark:bg-gray-700 p-5 pt-8">
                <h2 class="text-3xl font-bold text-white text-center">Management options</h2>
            </div>
            <div class="flex items-center justify-center w-full max-w-3xl space-x-4 mt-6">
                <RouterLink class="flex flex-col items-center justify-center w-1/2 h-48 bg-gray-700 hover:bg-gray-900 font-medium rounded-xl text-white text-sm focus:outline-none space-y-2" :to="{ name: 'manager.products.all' }">
                    <svg class="w-10 h-10 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z" />
                    </svg>
                    <span>Products</span>
                </RouterLink>
                <RouterLink class="flex flex-col items-center justify-center w-1/2 h-48 bg-gray-700 hover:bg-gray-900 font-medium rounded-xl text-white text-sm focus:outline-none space-y-2" :to="{ name: 'manager.orders' }">
                    <svg class="w-10 h-10 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-6 4h6m-6 4h6M6 3v18l2-2 2 2 2-2 2 2 2-2 2 2V3l-2 2-2-2-2 2-2-2-2 2-2-2Z" />
                    </svg>
                    <span>Orders</span>
                </RouterLink>
                <RouterLink class="flex flex-col items-center justify-center w-1/2 h-48 bg-gray-700 hover:bg-gray-900 font-medium rounded-xl text-white text-sm focus:outline-none space-y-2" :to="{ name: 'user.detail' }">
                    <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="white" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                    <span>Profile</span>
                </RouterLink>
            </div>
        </div>
    </section>
</template>
