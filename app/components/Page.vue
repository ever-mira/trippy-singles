<template>
  <div class="absolute top-0 left-0 h-full w-full">
    <div class="h-screen overflow-y-scroll" ref="scrollContainer">
      <div class="relative min-h-screen h-auto py-17 lg:py-14">
        <div class="px-4 md:px-7 lg:pl-10 xl:pl-13 2xl:pl-19 pb-50">
          <slot></slot>
        </div>
        <footer class="hidden md:block absolute bottom-0 w-full py-1 px-4">
          <AppFooter />
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { saveScrollPosition, getScrollPosition, showHeader, hideHeader } = useApp()
const routePath = useRoute().path

const scrollContainer = ref<HTMLElement | null>(null)

onBeforeRouteLeave((to, from) => {
  if (scrollContainer.value) {
    saveScrollPosition(routePath, scrollContainer.value.scrollTop)
  }
})

onMounted(() => {
  if (routePath.split("/").length - 1 < 2) {
    const savedPosition = getScrollPosition(routePath)

    if (savedPosition && scrollContainer.value) {
      scrollContainer.value.scrollTop = getScrollPosition(routePath) || 0
    }
  }
})

const lastScrollY = ref(0)

const handleScroll = () => {
  if (!scrollContainer.value) return

  const currentScrollY = scrollContainer.value.scrollTop

  if (currentScrollY > lastScrollY.value) {
    hideHeader()
  } else {
    showHeader()
  }

  lastScrollY.value = currentScrollY
}

onMounted(() => {
  scrollContainer.value?.addEventListener("scroll", handleScroll)
})

onUnmounted(() => {
  scrollContainer.value?.removeEventListener("scroll", handleScroll)
})
</script>
