import tailwindcss from '@tailwindcss/vite';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // supaya toggle dark mode manual bisa
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindcss],
}
