<template>
  <div class="pt-.5">
    <NuxtLink :to="to"
      class="block w-full px-3 lg:px-4 py-3.5 md:py-3.3 rounded-xl hover:bg-highlight dark:hover:bg-highlight-dark leading-none"
      :class="isLinkActive(to) ? 'bg-highlight dark:bg-highlight-dark font-semibold' : ''" @click="hideSidebar">
      <slot></slot>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps({
  to: {
    type: String,
    required: true,
  }
})

const { hideSidebar } = useApp()

const route = useRoute()
const activeRoute = computed(() => route.path)

const isLinkActive = (linkRoute: string) => {
  return activeRoute.value.includes(linkRoute)
    && (linkRoute !== '/' || activeRoute.value === '/')
    || (linkRoute === '/people' && activeRoute.value.startsWith('/@'))
}
</script>