/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{jsx,tsx,js,ts}"],
  theme: {
    extend: {
      fontFamily:{
        climate:"'Climate Crisis', cursive",
        diamond:"'Tilt Prism', cursive"
      }
    },
  },
  plugins: [],
}
