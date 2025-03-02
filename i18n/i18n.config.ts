export default defineI18nConfig(() => {
  return {
    legacy: false,
    strategy: "no_prefix",
    defaultLocale: "en",
    lazy: true,
    locales: [
      { name: "Deutsch", code: "de", file: "@/locales/de.json" },
      { name: "English", code: "en", file: "@/locales/en.json" },
    ],
  }
})
