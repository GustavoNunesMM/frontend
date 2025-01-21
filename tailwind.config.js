/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueTons: {
          Default: '#314b5e',
          light: '#284b63',
          click: '#1b2f3e',
          hover: '#233b4d'
        },
        grayTons: {
          Default: '#919293',
          darker: '#d9d9d9',
          light: '#ececec'
        },
        greenTons: {
          Default: '#48b89f',
          darker: '#3f9e89'
        }
      },
      boxShadow: {
        'button-click': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)', // Custom shadow
        'button-active': 'inset 0 4px 6px rgba(0, 0, 0, 0.2)', // Active/pressed state
      },
    },
  },
  plugins: [],
}

