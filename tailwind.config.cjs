/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#0e9ad1", 
          "secondary": "#36d1a0",     
          "accent": "#f3a1fc",   
          "neutral": "#1A1C2D",    
          "base-100": "#E4ECF1",     
          "info": "#4B8FD2",  
          "success": "#25D0AE",   
          "warning": "#E5B815",    
          "error": "#FB326B",
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}