// tailwind.config.js
module.exports = {
 content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}", // Tailwind will purge CSS from these files
 ],
 theme: {
  extend: {},
 },
 plugins: [],
};
