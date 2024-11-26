export default defineI18nConfig(() => {
  return {
    legacy: false,
    strategy: "no_prefix",
    defaultLocale: "en",
    lazy: true,
    locales: [
      { name: "Deutsch", code: "de", file: "@/locales/de.json" },
      { name: "English", code: "en", file: "@/locales/en.json" },
      { name: "Français", code: "fr", file: "@/locales/fr.json" },
      { name: "Español", code: "es", file: "@/locales/es.json" },
      { name: "Italiano", code: "it", file: "@/locales/it.json" },
      { name: "Nederlands", code: "nl", file: "@/locales/nl.json" },
    ],
  }
})
