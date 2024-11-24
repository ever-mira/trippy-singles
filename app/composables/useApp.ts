import type { Database } from "../../types/database.types";
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export function useApp() {
  const isSidebarVisible = useState<boolean | null>("isSidebarVisible", () => false);
  const scrollPositions = useState<Map<string, number> | null>(
    "scrollPosition",
    () => new Map<string, number>(),
  );

  const showSidebar = async () => {
    isSidebarVisible.value = true;
  };

  const hideSidebar = async () => {
    isSidebarVisible.value = false;
  };

  const delayHideSidebar = async () => {
    setTimeout(() => {
      hideSidebar();
    }, 200);
  };

  const toggleSidebar = async () => {
    isSidebarVisible.value = !isSidebarVisible.value;
  };

  function saveScrollPosition(routePath: string, position: number) {
    if (scrollPositions.value) {
      scrollPositions.value.set(routePath, position);
    }
  }

  function getScrollPosition(routePath: string) {
    if (scrollPositions.value) {
      return scrollPositions.value.get(routePath) || 0;
    }
  }

  return {
    isSidebarVisible,
    showSidebar,
    hideSidebar,
    toggleSidebar,
    delayHideSidebar,
    saveScrollPosition,
    getScrollPosition,
  };
}
