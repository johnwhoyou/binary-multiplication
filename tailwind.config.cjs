const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  daisyui: {
    themes: ["light", "dark", "bumblebee"],
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
}
