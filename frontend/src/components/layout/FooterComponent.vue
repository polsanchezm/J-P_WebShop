<script setup lang="ts"></script>

<template>
    <footer class="bg-gray-700 dark:bg-gray-900 p-4 sm:p-6">
        <div class="mx-auto max-w-screen-xl">
            <div class="md:flex md:justify-between">
                <div class="mb-6 md:mb-0">
                    <RouterLink class="inline-block self-center text-xl font-semibold whitespace-nowrap text-neutral-100 dark:text-neutral-200 hover:scale-110 transition-all" :to="{ name: 'home' }">J &amp; P</RouterLink>
                </div>
                <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-neutral-50 dark:text-neutral-100 uppercase">Resources</h2>
                        <ul class="text-neutral-100 dark:text-neutral-50">
                            <li class="mb-4">
                                <a href="https://flowbite.com" class="hover:text-neutral-400">Flowbite</a>
                            </li>
                            <li>
                                <a href="https://tailwindcss.com/" class="hover:text-neutral-400">Tailwind CSS</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-neutral-50 dark:text-neutral-100 uppercase">Follow us</h2>
                        <ul class="text-neutral-100 dark:text-neutral-50">
                            <li class="mb-4">
                                <a href="https://github.com/polsanchezm" class="hover:text-neutral-400">Pol's Github</a>
                            </li>
                            <li>
                                <a href="https://github.com/jeff-mcsc" class="hover:text-neutral-400">Jeff's Github</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-neutral-50 dark:text-neutral-100 uppercase">Legal</h2>
                        <ul class="text-neutral-100 dark:text-neutral-50">
                            <li class="mb-4">
                                <a href="#" class="hover:text-neutral-400">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#" class="hover:text-neutral-400">Terms &amp; Conditions</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr class="my-6 border-gray-300 sm:mx-auto dark:border-gray-400 lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-between">
                <span class="text-sm text-neutral-50 sm:text-center dark:text-neutal-100">© 2024 <a href="https://flowbite.com" class="hover:underline">J &amp; P</a>. All Rights Reserved. </span>
            </div>
        </div>
    </footer>
</template>
