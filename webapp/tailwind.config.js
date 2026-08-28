/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ml-green': '#22c55e', /* Approximate brand green */
        'ml-dark': '#0a0a0a',
      }
    },
  },
  plugins: [],
}
