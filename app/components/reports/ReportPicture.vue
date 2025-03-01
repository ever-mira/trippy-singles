<template>
  <div class="md:bg-highlight md:dark:bg-highlight-dark rounded-lg md:p-3 w-fit">
    <NuxtImg :src="report.avatar_url || undefined" width="700" class="rounded-lg max-w-65 md:max-w-77 cursor-pointer"
      v-if="report.avatar_url" @click="showModal(report.avatar_url)" />
    <PlaceholderPhoto v-else />
  </div>
</template>

<script setup lang="ts">
import type { ExtendedReport } from '~~/types/extended.types';
defineProps<{ report: ExtendedReport }>()

const { showModal } = useImageModal()
</script>

<style scoped></style>
