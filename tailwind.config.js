/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'mobile': {'max': '500px'},
        // => @media (max-width: 639px) { ... }
      },
      colors: {
        'dark-orange': '#c39b30',
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#c39b30","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    container: {
      padding: {
        DEFAULT: '30px',
        sm: '15px',
        lg: '15px',
        xl: '30px',
        '2xl': '30px',
      },
    },
  },
  corePlugins: {
    container: false
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft:'15px',
          paddingRight: '15px',
          '@screen sm': {
            paddingLeft: '15px',
            paddingRight: '15px',
          },
          '@screen md': {
            paddingLeft: '15px',
            paddingRight: '15px',
          },
          '@screen lg': {
            maxWidth: '1300px',
            paddingLeft: '30px',
            paddingRight: '30px',
          },
          '@screen xl': {
            maxWidth: '1300px',
            paddingLeft: '30px',
            paddingRight: '30px',
          },
        }
      })
    }
  ],
}