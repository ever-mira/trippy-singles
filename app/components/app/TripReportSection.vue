<template>
  <div class="flex gap-x-4 mt-11 lg:w-65% xl:w-50% 2xl:w-45%">
    <div>
      <h3 class="text-2xl">
        <BeakerIcon class="inline w-7.3 text-blue-500 dark:text-blue-600 -mt-1.7 mr-3" />Trip-Berichte
      </h3>

      <span class="block text-lg mt-2">Ich versuche, mich an meine ersten Trips zu erinnern. Vergessene Magie? Teile
        deine
        Erfahrungen, und lass dich finden.</span><br />
      <NuxtLink to="/reports"
        class="block text-blue-700 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 text-lg -mt-1">
        Trip-Berichte →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BeakerIcon } from "@heroicons/vue/24/solid"
const { stepComponent } = useSteps()
</script>
