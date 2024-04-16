/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: { 'food-image': "url('/src/assets/logoQuickDeli.png')", 'food-image-2': "url('/src/assets/bgfood.png')"},
    },
  },
  plugins: [],
}

