<template>
  <NuxtLink to="/about"
    class="lg:absolute flex flex-col right-0 top-18% xl:top-17% text-right pr-4 text-gray-900 dark:text-gray-200 mt-4 lg:mt-0">
    <div class="text-xl">
      <SparklesIcon class="inline w-7" />
    </div>
    <div class="text-2xl">Open Source</div>
    <div class="text-xl">Built by the community</div>
    <div class="text-xl">
      Built by us.
      <CursorArrowRippleIcon class="inline w-7 mt-1" />
    </div>
    <div class="text-sm">Contribute</div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { SparklesIcon } from "@heroicons/vue/24/solid"
import { CursorArrowRippleIcon } from "@heroicons/vue/24/solid"
</script>
