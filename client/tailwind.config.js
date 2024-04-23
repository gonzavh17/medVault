const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    colors: {
      'color-1': '#7469B6',
      'color-2': '#AD88C6',
      'color-3': '#E1AFD1',
      'color-4': '#FFE6E6',
    },
    fontFamily: {
      andika: ["Andika", "sans-serif"]
    }
  },
  plugins: [
    flowbite.plugin(),

  ],
}

