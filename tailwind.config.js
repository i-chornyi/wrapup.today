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
    extend: {
      colors: {
        purple: {
          DEFAULT: '#db76fd',
          transparent: '#3b82f640',
          hover: 'rgba(219,118,253,0.31)',
        },
        blue: {
          DEFAULT: '#3b82f6',
          transparent: '#3b82f640',
          hover: '#3b82f670',
        },
        grey: '#a6a6a6',
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
      },
      width: {
        112: '28rem',
        120: '30rem',
        128: '32rem',
      },
    },
  },
  plugins: [],
};
