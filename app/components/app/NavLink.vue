<template>
  <div class="pt-.5">
    <NuxtLink :to="to"
      class="block w-full px-3 lg:px-4 py-3.4 md:py-3.2 rounded-xl hover:bg-[#f6f6f6] dark:hover:bg-[#0b0b19] leading-none"
      activeClass="bg-[#f6f6f6] dark:bg-[#0a0a16] font-medium" @click="hideSidebar">
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