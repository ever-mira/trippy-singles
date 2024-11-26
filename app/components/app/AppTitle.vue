<template>
  <NuxtLink to="/"
    class="text-pink-600 lg:text-sky-600 dark:text-orange-300 text-[1.75rem] md:text-[1.7rem] font-semibold leading-none"
    @click="onClick">
    {{ $t('app.title') }}
  </NuxtLink>
</template>

<script setup lang="ts">
import Puzzle from '../steps/Puzzle.vue'

const { setStepComponent } = useSignup()
const { hideSidebar } = useApp()

const onClick = () => {
  setStepComponent(Puzzle)
  hideSidebar()
}
</script>
