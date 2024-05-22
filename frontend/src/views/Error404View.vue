<template>
    <section class="bg-white flex items-center justify-center h-screen">
        <div class="text-center">
            <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">404</h1>
            <p class="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something's missing.</p>
            <p class="mb-4 text-lg font-light text-gray-500">Sorry, we can't find that page. You'll find lots to explore on the home page.</p>
            <RouterLink :to="{ name: 'home' }" class="inline-flex items-center py-3 mt-10 text-white bg-gray-700 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-base px-5 text-center transition-colors"> Back to Homepage </RouterLink>
        </div>
    </section>
</template>
