module.exports = {
  content: ["index.html", "src/**/*.tsx"],
  mode: "jit",
  theme: {
    extend: {
      screens: {
        "md-lg": "960px",
      },
      width: {
        15: "3.75rem",
      },
      colors: {
        site: {
          950: "#07080b",
          900: "#0c0f1a",
          800: "#0F1322",
          700: "#181e2e",
          600: "#1d2134",
          550: "#363636",
          500: "#3c3f53",
          400: "#51525e",
          390: "#525b7a",
          350: "#70728b",
          340: "#7a8197",
          335: "#858fbf",
          330: "#898989",
          300: "#979cba",
          250: "#a0a1a1",
          200: "#f4f4ff",
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
      backgroundImage: {
        "item-bg-f15840": "url('/src/assets/images/item/f15840.png')",
        "item-bg-a7ec2e": "url('/src/assets/images/item/a7ec2e.png')",
        "item-bg-35a3f1": "url('/src/assets/images/item/35a3f1.png')",
      },
    },
  },
};
