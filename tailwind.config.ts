import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#eef7ff',
          '100': '#d9edff',
          '200': '#bbe0ff',
          '300': '#8cceff',
          '400': '#56b1ff',
          '500': '#2f8eff',
          '600': '#186ff8',
          '700': '#1158e4',
          '800': '#1547b8',
          '900': '#153a84',
          '950': '#132858',
        },  
      },
    },
  },
  plugins: [],
} satisfies Config;
