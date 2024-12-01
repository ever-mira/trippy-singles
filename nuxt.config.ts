import { defineNuxtConfig } from "nuxt/config"
import { fileURLToPath } from "url"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@unocss/nuxt",
    "@nuxtjs/supabase",
    "radix-vue/nuxt",
    "@nuxtjs/i18n",
    "@nuxthub/core",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
  ],
  app: {
    pageTransition: { name: "page", mode: "default" },
  },
  alias: {
    "@utils": fileURLToPath(new URL("./utils", import.meta.url)),
  },
  css: [
    "@unocss/reset/tailwind.css",
    "~/assets/global.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],
  supabase: {
    redirect: false,
  },
  googleFonts: {
    families: {
      Figtree: [100, 300, 400, 900],
    },
  },
  image: {
    cloudflare: {
      name: "cloudflare",
      baseURL: process.env.NUXT_PUBLIC_IMAGE_BASE_URL,
    },
  },
  i18n: {
    strategy: "no_prefix",
    defaultLocale: "en",
    lazy: true,
    locales: [
      {
        name: "Deutsch",
        code: "de",
        file: "de.json",
      },
      {
        name: "English",
        code: "en",
        file: "en.json",
      },
      {
        name: "Français",
        code: "fr",
        file: "fr.json",
      },
      {
        name: "Español",
        code: "es",
        file: "es.json",
      },
      {
        name: "Italiano",
        code: "it",
        file: "it.json",
      },
      {
        name: "Nederlands",
        code: "nl",
        file: "nl.json",
      },
    ],
  },
})
