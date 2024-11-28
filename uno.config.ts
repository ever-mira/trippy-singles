import { defineConfig, transformerDirectives } from "unocss"

export default defineConfig({
  transformers: [transformerDirectives()],
  shortcuts: [
    ["text-sub", "text-gray-600"],
    ["text-sub-dark", "text-gray-400"],
    ["bg-highlight", "bg-[#f6f6f6]"],
    ["bg-highlight-dark", "bg-[#0b0b19]"],
  ],
})
