/** @type {import('tailwindcss').Config} */
export default {
   darkMode: ['class'],
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)'
         },
         colors: {
            primary: {
               DEFAULT: '#FB5607',
               100: '#FED6C3',
               200: '#FDBA9B',
               300: '#FC9E73',
               400: '#FC9E73',
               500: '#FB5607',
               600: '#F04F05',
               700: '#C84204',
               800: '#A03503',
               900: '#642102'
            }
         }
      }
   },
   plugins: [require('tailwindcss-animate')]
}
