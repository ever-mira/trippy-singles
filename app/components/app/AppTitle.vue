<template>
  <NuxtLink to="/"
    class="text-pink-600 lg:text-blue-600 dark:text-orange-300 text-[1.75rem] md:text-[1.7rem] lg:text-[1.85rem] font-semibold leading-none"
    @click="onClick">
    {{ $t('app.title') }}
  </NuxtLink>
</template>

<script setup lang="ts">
import Puzzle from '../steps/Puzzle.vue'

const { setStepComponent } = useSteps()
const { hideSidebar } = useApp()

const onClick = () => {
  setStepComponent(Puzzle)
  hideSidebar()
}
</script>
