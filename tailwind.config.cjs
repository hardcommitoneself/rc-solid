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
          320: "#8b95c7",
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
        0.25: "0.0625rem",
        4.5: "1.125rem",
      },
      backgroundImage: {
        "item-f15840": "url('/src/assets/images/item/f15840.png')",
        "item-a7ec2e": "url('/src/assets/images/item/a7ec2e.png')",
        "item-35a3f1": "url('/src/assets/images/item/35a3f1.png')",
        "item-unknown": "url('/src/assets/images/item/unknown.png')",
        "coin-red": "url('/src/assets/images/coin/red_side.png')",
        "coin-blue": "url('/src/assets/images/coin/blue_side.png')",
      },
      boxShadow: {
        win: "0 0 25px 5px rgb(0 255 0 / 50%)",
        lose: "0 0 25px 5px rgb(255 0 0 / 50%)",
      },
      minWidth: {
        28: "5.5rem",
        30: "7.5rem",
      },
      height: {
        12.5: "3.125rem",
        23: "4.425rem",
      },
      width: {
        195: "48.75rem",
      },
      borderWidth: {
        0.25: "0.0625rem",
      },
    },
  },
};
