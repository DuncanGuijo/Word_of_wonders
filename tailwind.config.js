/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      boxShadow:{
        'standar-shadow' : '0_4.2px_4.2px_rgba(0,0,0,0.8)',
      }
    },
  },
  plugins: [],
}