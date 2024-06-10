/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import headlessui from "@headlessui/tailwindcss";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    headlessui
  ],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "luxury",
      "retro"
    ],
  },
}

