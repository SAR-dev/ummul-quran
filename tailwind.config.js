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
      "retro",
      // "bumblebee",
      // "emerald",
      // "corporate",
      // "synthwave",
      // "cyberpunk",
      // "valentine",
      // "halloween",
      // "garden",
      // "forest",
      // "aqua",
      // "lofi",
      // "pastel",
      // "fantasy",
      // "wireframe",
      // "black",
      // "dracula",
      // "cmyk",
      // "autumn",
      // "business",
      // "acid",
      // "lemonade",
      // "night",
      // "coffee",
      // "winter",
      // "dim",
      // "nord",
      // "sunset",
    ],
  },
}

