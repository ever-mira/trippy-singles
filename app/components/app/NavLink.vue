<template>
  <NuxtLink :to="to" class="block w-full px-5 py-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-950 leading-none"
    activeClass="bg-gray-50 dark:bg-gray-950">
    <slot></slot>
  </NuxtLink>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  }
})
</script>