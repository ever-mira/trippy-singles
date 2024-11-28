<template>
  <div class="pt-.5">
    <NuxtLink :to="to"
      class="block w-full px-3 lg:px-4 py-3.5 md:py-3.3 rounded-xl hover:bg-highlight dark:hover:bg-highlight-dark leading-none"
      activeClass="bg-highlight dark:bg-highlight-dark font-medium" @click="hideSidebar">
      <slot></slot>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  }
})

const { hideSidebar } = useApp()
</script>