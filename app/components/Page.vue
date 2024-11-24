<template>
  <div class="absolute top-0 left-0 h-full w-full">
    <div class="h-screen overflow-y-auto py-10 px-4 md:px-7 lg:py-10" ref="scrollContainer">
      <div class="max-w-340 mx-auto">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const routePath = useRoute().path
const { saveScrollPosition, getScrollPosition } = useApp()

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
</script>
