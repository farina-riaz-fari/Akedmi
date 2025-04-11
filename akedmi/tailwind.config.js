/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sss': '320px',
        'ss': '375px',
        'xs': '425px',
        '3xl': '1800px',
        '4xl': '2000px',
      },
    },
  },
  plugins: [],
}