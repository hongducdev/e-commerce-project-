/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      width: {
        main: "1180px",
      },
      colors: {
        primary: "#ee3131",
        secondary: "#00d5d5",
        textColor: "#1c1d1d",
        grayDark: "#151515",
      },
      keyframes: {
        "slide-up": {
          "0%": {
            "-webkit-transform": "translateY(0)",
            transform: "translateY(0)",
          },
          "100%": {
            "-webkit-transform": "translateY(-100px)",
            transform: "translateY(-100px)",
          },
        },
      },
      animation: {
        "slide-up":
          "slide-top 5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      }
    },
  },
  plugins: [],
};
