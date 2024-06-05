module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        summer: '#FFDB58',
        winter: '#00BFFF',
        rainy: '#4682B4',
        default: '#F0E68C',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
