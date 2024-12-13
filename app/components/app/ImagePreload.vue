<template>
  <div class="hidden">
    <NuxtImg :src="props.url" height="70" width="70" fit="cover" />
    <NuxtImg :src="props.url" width="700" />
    <NuxtImg :src="props.url" height="910" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  url: { type: String, required: true },
})
</script>
