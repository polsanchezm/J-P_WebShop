/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'media',
    content: ['./node_modules/flowbite/**/*.js'],
    theme: {
        extend: {
            colors: {
                gray: {
                    50: '#f7f7f5',
                    100: '#edece7',
                    200: '#dad8ce',
                    300: '#c3c0ae',
                    400: '#a69f87',
                    500: '#998f76',
                    600: '#8c816a',
                    700: '#756a59',
                    800: '#61584b',
                    900: '#4f483f',
                    950: '#2a2520'
                },
                metal: {
                    50: '#f6f7f6',
                    100: '#e2e6e1',
                    200: '#c6ccc3',
                    300: '#a0ab9d',
                    400: '#7b8978',
                    500: '#616e5e',
                    600: '#4c574a',
                    700: '#3f483d',
                    800: '#383f37',
                    900: '#2e332e',
                    950: '#171c17'
                },
                ecru: {
                    50: '#f7f7ef',
                    100: '#eeefdf',
                    200: '#d7d8b0',
                    300: '#c1c083',
                    400: '#afab60',
                    500: '#a09852',
                    600: '#897d45',
                    700: '#6f6139',
                    800: '#5e5135',
                    900: '#524631',
                    950: '#2e261a'
                },
                spice: {
                    50: '#f7f6ef',
                    100: '#ece7d5',
                    200: '#dbd0ad',
                    300: '#c6b27e',
                    400: '#b5985a',
                    500: '#a6854c',
                    600: '#8f6b3f',
                    700: '#735235',
                    800: '#644733',
                    900: '#553b2e',
                    950: '#301f18'
                },
                moon: {
                    50: '#f6f5f0',
                    100: '#dfdec8',
                    200: '#d4d1b4',
                    300: '#bbb589',
                    400: '#a79d68',
                    500: '#988c5a',
                    600: '#82734c',
                    700: '#695a3f',
                    800: '#5a4b39',
                    900: '#4e4235',
                    950: '#2c241c'
                },
                tobacco: {
                    50: '#f7f5ef',
                    100: '#ebe5d6',
                    200: '#d9cdaf',
                    300: '#c3ac81',
                    400: '#b1915e',
                    500: '#a28050',
                    600: '#846240',
                    700: '#704f38',
                    800: '#5f4334',
                    900: '#533b30',
                    950: '#2f1f19'
                },
                corduroy: {
                    50: '#f6f7f6',
                    100: '#e2e5e3',
                    200: '#c4cbc4',
                    300: '#9eaa9e',
                    400: '#7a877a',
                    500: '#667467',
                    600: '#4b564c',
                    700: '#3e473f',
                    800: '#343b34',
                    900: '#2e332f',
                    950: '#181b19'
                },
                clay: {
                    50: '#f3f4f1',
                    100: '#e5e8df',
                    200: '#c6ccba',
                    300: '#aeb79f',
                    400: '#919d7e',
                    500: '#748062',
                    600: '#5a654b',
                    700: '#474f3c',
                    800: '#3b4133',
                    900: '#34392e',
                    950: '#1a1d16'
                },
                pancho: {
                    50: '#fbf7f1',
                    100: '#f5ecdf',
                    200: '#e4c8aa',
                    300: '#ddb894',
                    400: '#ce9469',
                    500: '#c47b4b',
                    600: '#b66640',
                    700: '#975137',
                    800: '#7a4332',
                    900: '#63382b',
                    950: '#351b15'
                }
            }
        },
        fontFamily: {
            body: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
            sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
            lora: ['Lora', 'ui-sans-serif', 'system-ui', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
        }
    },
    plugins: [require('flowbite/plugin')]
};
