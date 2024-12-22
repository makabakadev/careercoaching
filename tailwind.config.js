/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f7ff',
        'dark-blue': '#0a1628',
      },
    },
  },
  plugins: [],
};