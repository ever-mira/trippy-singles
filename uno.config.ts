import { defineConfig, transformerDirectives } from "unocss";

export default defineConfig({
  transformers: [transformerDirectives()],
  shortcuts: [
    ["text-sub", "text-gray-600"],
    ["text-sub-dark", "text-gray-400"],
  ],
});
