import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        klee: ["var(--font-klee-one)", "BIZ UDPMincho"],
        zenAntique: ["var(--font-zen-antique)", "BIZ UDPMincho"],
        emoji: ["var(--font-noto-color-emoji)"],
        stick: ["var(--font-stick)"],
      },
      colors: {
        primary: {
          default: "#33ccbb",
          "50": "#f1fcfa",
          "100": "#cef9f1",
          "200": "#9df2e2",
          "300": "#64e4d2",
          "400": "#33ccbb",
          "500": "#1bb1a2",
          "600": "#138e85",
          "700": "#14716b",
          "800": "#155a57",
          "900": "#164b49",
          "950": "#062d2d",
        },
        secondary: {
          default: "#ff0099",
          "50": "#fff0fa",
          "100": "#ffe3f8",
          "200": "#ffc6f2",
          "300": "#ff98e5",
          "400": "#ff58d1",
          "500": "#ff27bb",
          "600": "#ff0099",
          "700": "#df007a",
          "800": "#b80065",
          "900": "#980356",
          "950": "#5f0030",
        },
      },
    },
  },
  plugins: [],
};
export default config;
