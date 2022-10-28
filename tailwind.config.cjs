module.exports = {
  content: ["index.html", "src/**/*.tsx"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        site: {
          900: "#0c0f1a",
          800: "#0F1322",
          700: "#181e2e",
          600: "#1d2134",
          500: "#3c3f53",
          400: "#51525e",
          350: "#70728b",
          300: "#979cba",
        },
        primary: "#cf2f01",
        secondary: "#fd3c01",
        error: {
          100: "#761c19",
        },
      },
    },
  },
};
