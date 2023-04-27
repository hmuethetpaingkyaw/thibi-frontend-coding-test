/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: "375px",
      sm: "600px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
    },
    extend: {
      colors: {
        primary: '#E63462',
        accent: '#333745',
      }
    },
  },
  plugins: [],
  safelist: [{
    pattern: /(bg|text|border)-(primary|accent)/
  }]
}
