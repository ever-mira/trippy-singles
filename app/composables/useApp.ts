const state = reactive({
  isSidebarVisible: ref<boolean | null>(false),
  isHeaderVisible: ref<boolean | null>(true),
  scrollPositions: ref<Map<string, number> | null>(new Map<string, number>()),
  isDark: false,
})

export function useApp() {
  const showSidebar = async () => {
    state.isSidebarVisible = true
  }

  const hideSidebar = async () => {
    state.isSidebarVisible = false
  }

  const toggleSidebar = async () => {
    state.isSidebarVisible = !state.isSidebarVisible
  }

  function saveScrollPosition(routePath: string, position: number) {
    if (state.scrollPositions) {
      state.scrollPositions.set(routePath, position)
    }
  }

  function getScrollPosition(routePath: string) {
    if (state.scrollPositions) {
      return state.scrollPositions.get(routePath) || 0
    }
  }

  const showHeader = async () => {
    state.isHeaderVisible = true
  }

  const hideHeader = async () => {
    state.isHeaderVisible = false
  }

  const initializeDark = () => {
    loadDark()
  }

  const isDarkCookie = useCookie<boolean>("is-dark")

  const loadDark = () => {
    state.isDark = isDarkCookie.value
  }

  const toggleDark = () => {
    state.isDark = !state.isDark
    applyDark()
    saveDark()
  }

  const saveDark = () => {
    isDarkCookie.value = state.isDark
  }

  const applyDark = () => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", state.isDark)
    }
  }

  return {
    ...toRefs(state),
    showSidebar,
    hideSidebar,
    toggleSidebar,
    saveScrollPosition,
    getScrollPosition,
    showHeader,
    hideHeader,
    initializeDark,
    toggleDark,
  }
}
