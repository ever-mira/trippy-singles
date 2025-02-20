import { defineConfig, transformerDirectives, presetUno } from "unocss"

export default defineConfig({
  presets: [presetUno()],
  transformers: [transformerDirectives()],
  extendTheme: (theme) => ({
    ...theme,
    breakpoints: {
      ...theme.breakpoints,
      "3xl": "2000px",
      "4xl": "2200px",
    },
  }),
  shortcuts: [
    ["text-sub", "text-gray-600"],
    ["text-sub-dark", "text-gray-400"],
    ["bg-highlight", "bg-[#f6f6f6]"],
    ["bg-highlight-dark", "bg-[#0b0b19]"],
  ],
  theme: {
    fontFamily: {
      figtree: "Figtree",
      pacifico: "Pacifico",
      inter: "Inter",
    },
    boxShadow: {
      mdsm: "0 2px 4px rgba(0, 0, 140, 0.1)",
    },
  },
  rules: [
    [
      "animate-pulse",
      {
        animation: "pulse 5s ease-in-out infinite",
      },
    ],
  ],
  preflights: [
    {
      getCSS: () => `
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
          }
        }
      `,
    },
  ],
})
