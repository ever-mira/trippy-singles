<template>
  <NuxtLink to="/about"
    class="md:absolute flex flex-col right-0 top-29% text-right pr-4 text-gray-900 dark:text-gray-200">
    <div class="text-xl">
      <SparklesIcon class="inline w-7" />
    </div>
    <div class="text-2xl">
      Open Source
    </div>
    <div class="text-xl">
      Built by the community
    </div>
    <div class="text-xl">
      Help building.
      <CursorArrowRippleIcon class="inline w-7 mt-1" />
    </div>
    <div class="text-sm">
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { SparklesIcon } from '@heroicons/vue/24/solid'
import { CursorArrowRippleIcon } from '@heroicons/vue/24/solid'
</script>
