/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f8f1e6",
        rice: "#fffaf2",
        tea: "#6b4425",
        ink: "#3b2a1a",
        mutedTea: "#9a8068",
        line: "#e0c49e",
        softGold: "#c79a4b"
      },
      boxShadow: {
        paper: "0 24px 70px rgba(96, 62, 28, 0.12)"
      },
      fontFamily: {
        serifcn: ["Georgia", "STSong", "SimSun", "serif"],
        bodycn: ["PingFang SC", "Microsoft YaHei", "sans-serif"]
      }
    }
  },
  plugins: []
};
