/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  // important: "#root",
  theme: {
    extend: {},
  },
  plugins: [],
};
