/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_bg_dark: "#1f1c39",
        owner_bg: "#6f61e8",
        msg_txt: "#dddddd",
        friend_bg: "#2b2251",
        activeTab: "#43c4af",
        inactivetxt: "#3a3aaa",
        activeRing:"#22ffaa"
      },
    },
  },
  plugins: [],
};
