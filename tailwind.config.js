// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // This tells Tailwind to scan all files in the 'src' directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
