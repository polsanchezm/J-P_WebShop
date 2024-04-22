<script setup>
import 'vue3-carousel/dist/carousel.css';
import image1 from '@/assets/fondo.png';

import { ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';

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
        <div class="bg-gradient-to-br from-[#00000055] to-[#00000077]  h-full">
            <div
                class="container flex flex-col items-center justify-center mx-auto lg:p-36 p-4 text-center lg:min-h-screen min-h-[50vh] transition-all duration-1000">
                <h1
                    class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-[200px] font-lora dark:text-white">
                    J&P</h1>
                <p class="mb-8 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-200">
                    Discover
                    your unique style with our versatile unisex collection at our store.</p>
                <div
                    class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <a href="#"
                        class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700">
                        Explore
                        <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                    <a href="#"
                        class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800">
                        Sign Up
                        <svg class="ml-2 -mr-1 w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
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
    /* background-image: linear-gradient(to right, #581a94, #54178e, #501588, #4c1382, #48107c, #48107c, #48107c, #48107c, #4c1382, #501588, #54178e, #581a94); */
    background-image: url('@/assets/banner-background.webp');
    background-size: cover;
    background-position: center;
}

.signin-button {
    background-color: #343a40;
    color: #ffffff;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    cursor: pointer;
}

.signin-button:hover {
    background-color: #23272b;
}

.signup-button {
    background-color: #ffffff;
    color: #6c0ec2;
    border: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: background-color 0.3s ease, color 0.3s ease;
    cursor: pointer;
}

.signup-button:hover {
    background-color: #6c0ec2;
    color: #ffffff;
}
</style>
