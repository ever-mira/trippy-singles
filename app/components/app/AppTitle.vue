<template>
  <NuxtLink to="/" class="text-sky-600 dark:text-orange-300 text-[1.65rem] md:text-[1.7rem] font-semibold leading-none"
    @click="onClick">
    {{ $t('app.title') }}
  </NuxtLink>
</template>


<script setup lang="ts">
import useAuth from '../../service/auth'
import Puzzle from '../auth/Puzzle.vue'

const { setStepComponent, displayname } = useAuth()

const onClick = () => {
  setStepComponent(Puzzle)
}
</script>
