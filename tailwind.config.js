/** @type {import('tailwindcss').Config} */
module.exports={
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        dark_2: "#151515"
      },
      fontFamily: {
        "dmSans": ["DM Sans","sans-serif"]
      }
    },
    screens: {
      xs: "370px",
      sm: "450px",
      md: "768px",
      lg: "970px",
      xl: "1024px"
    }
  },
  plugins: [],
}