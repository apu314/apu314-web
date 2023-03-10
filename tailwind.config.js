/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './layouts/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    colors: {
      transparent: 'transparent',
      github: '#171515',
      linkedin: '#0A66C2',
      twitter: '#1A8CD8',
      '314-blue': '#1b8dda',
      //
      white: colors.white,
      cerulean: {
        50: '#eff9ff',
        100: '#dff1ff',
        200: '#b7e5ff',
        300: '#78d2ff',
        400: '#30bbff',
        500: '#059ae5',
        600: '#0082cf',
        700: '#0067a7',
        800: '#02588a',
        900: '#084872'
      },
      blue: colors.blue,
      purple: colors.purple,
      pink: colors.pink,
      orange: colors.orange,
      green: colors.green,
      yellow: colors.yellow,
      // gray: colors.gray,
      // gray: '#8492a6',
      gray: {
        50: '#f4f6f7',
        100: '#e2e6eb',
        200: '#c8cfd9',
        300: '#a2adbe',
        400: '#8492a6',
        500: '#5a6a80',
        600: '#4d586d',
        700: '#434b5b',
        800: '#3c424e',
        900: '#353944'
      },
      'gray-light': '#d3dce6',
      'gray-dark': '#273444'
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      } /* 
      maxWidth: {
        DEFAULT: '100%',
        sm: '640px',
        lg: '960px',
        xl: '1280px',
        '2xl': '1520px',
      } */
    }
    /* extend: {
      backgroundColor: ['dark'],
      textColor: ['dark']
    } */
  },
  plugins: []
}
