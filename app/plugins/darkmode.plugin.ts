export default defineNuxtPlugin(async (nuxtApp) => {
  const { initializeDark } = useApp()
  initializeDark()
})
