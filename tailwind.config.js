/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"]
      },
      colors: {
        primary: "#9C95DC",
        secondary: "#FAFAFA"
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem"
        }
      },
      screens: {
        sm: "375px",
        xl: "1441px"
      }
    },
  },
  plugins: [],
}