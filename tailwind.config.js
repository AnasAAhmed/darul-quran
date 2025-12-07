import { heroui } from "@heroui/react";
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  darkMode: "class",
  plugins: [
    heroui(
      {
        "themes": {
          "light": {
            "colors": {
              // "default": {
              //   "50": "#e7edec",
              //   "100": "#c6d3d1",
              //   "200": "#a4b9b6",
              //   "300": "#839f9b",
              //   "400": "#618680",
              //   "500": "#406c65",
              //   "600": "#355953",
              //   "700": "#2a4642",
              //   "800": "#1e3330",
              //   "900": "#13201e",
              //   "foreground": "#fff",
              //   "DEFAULT": "#406c65"
              // },
              "themeInput": {
                "foreground": "#141414",
                "DEFAULT": "#141414"
              },
              "primary": {
                "50": "#dfedfd",
                "100": "#b3d4fa",
                "200": "#86bbf7",
                "300": "#59a1f4",
                "400": "#2d88f1",
                "500": "#006fee",
                "600": "#005cc4",
                "700": "#00489b",
                "800": "#003571",
                "900": "#002147",
                "foreground": "#fff",
                "DEFAULT": "#006fee"
              },
              "secondary": {
                "50": "#eee4f8",
                "100": "#d7bfef",
                "200": "#bf99e5",
                "300": "#a773db",
                "400": "#904ed2",
                "500": "#7828c8",
                "600": "#6321a5",
                "700": "#4e1a82",
                "800": "#39135f",
                "900": "#240c3c",
                "foreground": "#fff",
                "DEFAULT": "#7828c8"
              },
              "success": {
                "50": "#e7edec",
                "100": "#c6d3d1",
                "200": "#a4b9b6",
                "300": "#839f9b",
                "400": "#618680",
                "500": "#406c65",
                "600": "#355953",
                "700": "#2a4642",
                "800": "#1e3330",
                "900": "#13201e",
                "foreground": "#fff",
                "DEFAULT": "#406c65"
              },
            },
          },
        },
      }
    )
  ],
};