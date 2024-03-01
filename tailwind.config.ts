import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/theme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        mb: { max: "640px" }, // Define your mobile breakpoint width
      },
      fontFamily: {
        manrope: ["var(--font-manrope)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark", // default theme to extend on c
      layout: {},
      themes: {
        dark: {
          colors: {
            background: "#000000",
            foreground: "#ECEDEE",
            divider: "#8F8F8F",
            focus: "#006FEE",
            content1: "#18181b",
            content2: "#27272a",
            content3: "#3f3f46",
            content4: "#52525b",
            default: {
              50: "#18181b",
              100: "#27272a",
              200: "#3f3f46",
              300: "#52525b",
              400: "#71717a",
              500: "#a1a1aa",
              600: "#d4d4d8",
              700: "#e4e4e7",
              800: "#f4f4f5",
              900: "#fafafa",
              DEFAULT: "#a1a1aa",
            },
            primary: {
              100: "#cce2fc",
              200: "#99c5f8",
              300: "#66a9f5",
              400: "#338cf1",
              500: "#006fee",
              600: "#0059be",
              700: "#00438f",
              800: "#002c5f",
              900: "#001630",
              DEFAULT: "#0059be",
            },
          },
        },
        light: {
          colors: {
            background: "#ffffff",
            foreground: "#11181C",
            divider: "rgba(17, 17, 17, 0.15)",
            focus: "#006FEE",
            content1: "#FFFFFF",
            content2: "#f4f4f5",
            content3: "#e4e4e7",
            content4: "#d4d4d8",
            default: {
              50: "#fafafa",
              100: "#f4f4f5",
              200: "#e4e4e7",
              300: "#d4d4d8",
              400: "#a1a1aa",
              500: "#71717a",
              600: "#52525b",
              700: "#3f3f46",
              800: "#27272a",
              900: "#18181b",
              DEFAULT: "#d4d4d8",
            },

            primary: {
              50: "#e6f1fe",
              100: "#cce3fd",
              200: "#99c7fb",
              300: "#66aaf9",
              400: "#338ef7",
              500: "#006FEE",
              600: "#005bc4",
              700: "#004493",
              800: "#002e62",
              900: "#001731",
              DEFAULT: "#006FEE",
            },
          },
        },
      },
    }),
  ],
};
export default config;
