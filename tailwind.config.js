/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./apps/wrapup/src/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '2rem',
      '4xl': '2.5rem',
      '5xl': '3rem',
      '10xl': '6rem',
    },
    extend: {},
  },
  plugins: [],
};
