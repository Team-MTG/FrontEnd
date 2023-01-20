/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        spinner: 'spinner 2.5s linear infinite',
      },
      keyframes: {
        spinner: {
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
    },
    fontFamily: {
      sc: ['scdream', 'sans-serif'],
      tn: ['tenada', 'sans-serif'],
      mtg: ['galmuri', 'sans-serif'],
    },
  },
  plugins: [],
};
