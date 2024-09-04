/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-400': '#0078FF',
        'blue-500': '#177EF3',
        'blue-700': '#0259BB',
        'blue-gray-500': '#435265',
        'gray-100': '#E2ECF2',
        'gray-200': '#DEE5E9',
        'gray-300': '#D6D4D4',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['rounded'],
  },
};
