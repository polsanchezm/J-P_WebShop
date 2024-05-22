const animate = require("tailwindcss-animate")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",

  content: [
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}',
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        "collapsible-up": {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
    },
    fontFamily: {
      body: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      lora: ['Lora', 'ui-sans-serif', 'system-ui', '-apple-system', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji']
    }
  },
  plugins: [animate, require('flowbite/plugin'), require('@tailwindcss/aspect-ratio'),],
}