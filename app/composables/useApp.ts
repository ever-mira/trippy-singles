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
    applyDark()
  }

  const loadDark = () => {
    if (localStorage.getItem("isDark")) {
      state.isDark = JSON.parse(localStorage.getItem("isDark") || state.isDark.toString())
    }
  }

  const toggleDark = () => {
    state.isDark = !state.isDark
    applyDark()
    saveDark()
  }

  const saveDark = () => {
    localStorage.setItem("isDark", state.isDark.toString())
  }

  const applyDark = () => {
    if (state.isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
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
