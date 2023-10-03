import flowbiteplugin from "flowbite/plugin"
import { skeleton as skeletonPlugin } from "@skeletonlabs/tw-plugin";
import tailwindcssforms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        }
      },
      backgroundColor: {
        50: "red"
      }
    },
  },
  plugins: [
    flowbiteplugin,
    skeletonPlugin({
      themes: { preset: ["rocket"] }
    }),
    tailwindcssforms
  ],
  important: true
} satisfies Config;

export default config;
