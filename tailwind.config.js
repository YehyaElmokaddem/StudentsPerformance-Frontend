/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("daisyui")],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
};
