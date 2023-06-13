/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      width: {
        main: "1220px",
      },
      colors: {
        primary: "#ee3131",
        textColor: "#1c1d1d",
        grayDark: "#151515",
      },
    },
  },
  plugins: [],
};
