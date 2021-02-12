module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#0C3B84",
        secondary: "#05244E",
        companyYello: "#FFFF1A",
        third: "#057DF6",
      },
      fontFamily: {
        sans: ["Montserrat"],
        Montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  variants: {
    extend: { display: ["group-hover"] },
  },
  plugins: [],
};
