<template>
  <div class="absolute top-0 left-0 h-full w-full">
    <div class="h-screen overflow-y-auto py-17 px-4 md:px-7 lg:px-11 lg:py-19" ref="scrollContainer">
      <div class="max-w-340 xl:max-w-350 mx-auto">
        <slot></slot>
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
  const savedPosition = getScrollPosition(routePath)

  if (savedPosition && scrollContainer.value) {
    scrollContainer.value.scrollTop = getScrollPosition(routePath) || 0
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
  scrollContainer.value?.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  scrollContainer.value?.removeEventListener('scroll', handleScroll)
})
</script>
