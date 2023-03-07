module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './layouts/**/*.{js,jsx,ts,tsx}'
  ],
  darkModde: 'class',
  theme: {
    colors: {
      github: '#171515',
      linkedin: '#0A66C2',
      twitter: '#1A8CD8',
      '314-blue': '#1b8dda',
      //
      // white: '#fff',
      blue: '#1fb6ff',
      purple: '#7e5bef',
      pink: '#ff49db',
      orange: '#ff7849',
      green: '#13ce66',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6'
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
    },
    extend: {
      backgroundColor: ['dark'],
      textColor: ['dark']
    }
  },
  plugins: []
}
