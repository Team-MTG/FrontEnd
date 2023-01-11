/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sc: ['scdream', 'sans-serif'],
      tn: ['tenada', 'sans-serif'],
      mtg: ['galmuri', 'sans-serif'],
    },
  },
  plugins: [],
};
