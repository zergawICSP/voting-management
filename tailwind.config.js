module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#33587C",
        secondary: "#05244E",
        third: "#057DF6",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  variants: {
    extend: { display: ["group-hover"] },
  },
  plugins: [],
};
