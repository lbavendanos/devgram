module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      screens: {
        sm: '600px',
        md: '700px',
        lg: '800px',
        xl: '900px',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
