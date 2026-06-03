import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/santen/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7efe2",
        rice: "#fffaf1",
        sand: "#ead7bd",
        tea: "#6f4524",
        ink: "#2f241b",
        mutedTea: "#9a7b61",
        line: "#d9b98d",
        seal: "#9b4c2f"
      },
      boxShadow: {
        soft: "0 26px 80px rgba(98, 62, 31, 0.13)"
      },
      fontFamily: {
        serifcn: ["Georgia", "STSong", "SimSun", "serif"],
        bodycn: ["PingFang SC", "Microsoft YaHei", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
