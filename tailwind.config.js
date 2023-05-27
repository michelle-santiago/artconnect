/** @type {import('tailwindcss').Config} */
export default {
  content: [
    
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors:{
        primary: {
          '50': '#f7f7f7',
          '100': '#e3e3e3',
          '200': '#c8c8c8',
          '300': '#a4a4a4',
          '400': '#818181',
          '500': '#666666',
          '600': '#515151',
          '700': '#434343',
          '800': '#383838',
          '900': '#313131',
          '950': '#000000',
      },
      secondary: {
        '50': '#fdfce9',
        '100': '#faf8c7',
        '200': '#f8f1a5',
        '300': '#f1de53',
        '400': '#ebca24',
        '500': '#dbb217',
        '600': '#bd8b11',
        '700': '#976511',
        '800': '#7d5116',
        '900': '#6b4218',
        '950': '#3e230a',
    },
      }
    },
  },
  plugins: [
  require('@tailwindcss/forms'),
  require('@tailwindcss/aspect-ratio'),
  require('@tailwindcss/typography'),
  require('@tailwindcss/container-queries'),
  require('flowbite/plugin')],

}

