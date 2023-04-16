const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    fontSize: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-cabin)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-fluid-type")],
};
