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
          390: "#525b7a",
          350: "#70728b",
          340: "#7a8197",
          330: "#898989",
          300: "#979cba",
        },
        primary: "#cf2f01",
        secondary: "#fd3c01",
        error: {
          100: "#761c19",
        },
        gradient: {
          orange: {
            100: "#a32301",
            200: "#fc3c01",
          },
          "dark-gray": {
            100: "#181e2e",
            200: "#0f1322",
          },
        },
      },
      padding: {
        4.5: "1.125rem",
      },
    },
  },
};
