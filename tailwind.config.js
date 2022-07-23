/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  // important: "#root",
  theme: {
    extend: {
      colors: {
        light: {
          primary: {
            DEFAULT: "#486641",
            contrastText: "#FFFFFF",
          },
          secondary: {
            DEFAULT: "#B4CBCC",
            contrastText: "#203435",
          },
          background: {
            DEFAULT: "#FEFCF8",
            paper: "#FEFCF8",
          },
          text: {
            primary: "#1B1C1A",
            secondary: "#454842",
            helper: "#757872",
          },
        },
        dark: {
          primary: {
            DEFAULT: "#7ABB6C",
            contrastText: "#1B3716",
          },
          secondary: {
            DEFAULT: "#517E82",
            contrastText: "#FFFFFF",
          },
          background: {
            DEFAULT: "#1B1C1A",
            paper: "#2C3229",
          },
          text: {
            primary: "#E4E2DE",
            secondary: "#C6C7C0",
            helper: "#8F918B",
          },
        },
      },
    },
  },
  plugins: [],
};
