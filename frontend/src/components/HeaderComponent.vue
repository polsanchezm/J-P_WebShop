<script setup>
import 'vue3-carousel/dist/carousel.css';
import image1 from '@/assets/fondo.png';

import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';
import { useAuthStore } from '@/stores/client/auth';
const authStore = useAuthStore();

const images = ref([
    { src: image1, alt: 'Descripción de la imagen 1' },
    { src: image1, alt: 'Descripción de la imagen 2' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' },
    { src: image1, alt: 'Descripción de la imagen 3' }
]);
</script>

<template>
    <section class="header-background">
        <div class="bg-gradient-to-b from-[#00000077] to-[#00000099] h-full">
            <div
                class="container flex flex-col items-center justify-center mx-auto lg:p-36 p-4 text-center lg:min-h-screen min-h-[50vh] transition-all duration-1000">
                <h1
                    class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-neutral-100 md:text-5xl lg:text-[200px] font-lora dark:text-neutral-200">
                    J &amp; P</h1>
                <p
                    class="mb-8 text-lg text-neutral-100 lg:text-xl sm:px-16 xl:px-48 dark:text-neutral-200 lg:text-[25px] font-bold">
                    Discover your unique style with our versatile unisex collection at our store.</p>
                <div
                    class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <a href="#"
                        class="explore-button inline-flex justify-center items-center py-4 px-6 text-base font-medium text-center rounded-lg dark:text-neutral-100 dark:bg-neutral-800 dark:hover:bg-neutral-100 dark:hover:text-neutral-800 transition-colors">
                        Explore
                        <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                    <!-- <RouterLink v-if="authStore.isLoggedIn" :to="{ name: 'register' }" -->
                    <RouterLink  :to="{ name: 'register' }"
                        class="signup-button inline-flex justify-center items-center py-4 px-6 text-base font-medium text-center rounded-lg dark:text-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 transition-colors">
                        Sign Up
                        <svg class="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </RouterLink>
                </div>
            </div>
        </div>
    </section>

    <div>
        <Carousel :autoplay="5000" :transition="2000" :wrap-around="true">
            <Slide v-for="image in images" :key="image">
                <img :src="image.src" :alt="image.alt" class="block w-96" />
            </Slide>
        </Carousel>
    </div>
</template>

<style scoped>
.header-background {
    background-image: url('@/assets/banner-background.webp');
    background-size: cover;
    background-position: center;
}
</style>
