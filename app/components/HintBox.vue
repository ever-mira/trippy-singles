<template>
  <div
    class="bg-blue-50 dark:bg-black dark:border dark:border-gray-800 text-blue-900 dark:text-blue-300 bg-opacity-50 p-5 rounded-xl flex">
    <div class="px-2.5">
      <CubeTransparentIcon class="inline w-6.5 text-gray-800 mr-1.5 -ml-2.2 text-blue-900 dark:text-blue-200" />
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CubeTransparentIcon } from "@heroicons/vue/24/outline"

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped></style>
