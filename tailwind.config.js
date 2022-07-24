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
            "contrast-text": "#FFFFFF",
          },
          secondary: {
            DEFAULT: "#B4CBCC",
            "contrast-text": "#203435",
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
            "contrast-text": "#1B3716",
          },
          secondary: {
            DEFAULT: "#517E82",
            "contrast-text": "#FFFFFF",
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
    boxShadow: {
      DEFAULT:
        "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
      md: "0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
      lg: "0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3)",
      xl: "0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px rgba(0, 0, 0, 0.3)",
      "2xl":
        "0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3)",
    },
  },
  plugins: [],
};
