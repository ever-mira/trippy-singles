<template>
  <template v-if="props.to">
    <NuxtLink :to="props.to" :class="`${baseClasses} ${colorClasses} ${sizeClasses} ${$attrs.class}`" v-bind="$attrs"
      @click="handleClick">
      <slot />
    </NuxtLink>
  </template>
  <template v-else>
    <button :class="`${baseClasses} ${colorClasses} ${sizeClasses} ${$attrs.class || ''}`" v-bind="$attrs"
      @click="handleClick">
      <slot />
    </button>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  color?: string
  size?: 'small' | 'large'
  to?: string // Add `to` prop for router-link functionality
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'click'): void }>()


const baseClasses = 'text-white font-medium focus:outline-none rounded-xl rounded-lg cursor-pointer font-semibold text-center shadow-xs transition-all duration-300'

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'px-4.5 py-2 text-sm'
    case 'large':
      return 'py-2.5 px-6 text-sm'
    default:
      return 'py-2.5 px-6 text-sm'
  }
})

const colorClasses = computed(() => {
  switch (props.color) {
    case 'indigo':
      return 'bg-indigo-50 !text-indigo-500 dark:!text-indigo-300 hover:bg-indigo-100 dark:bg-indigo-900 dark:hover:bg-indigo-800'
    case 'red':
      return 'bg-red-50 !text-red-500 dark:!text-red-300 hover:bg-red-100 dark:bg-red-900 dark:hover:bg-red-800'
    case 'transparent':
      return '!text-gray-800 !dark:text-gray-300'
    default:
      return 'bg-indigo-50 !text-indigo-500 dark:!text-indigo-300 hover:bg-indigo-100 dark:bg-indigo-900 dark:hover:bg-indigo-800'
  }
})

const handleClick = () => {
  if (!props.to) {
    emit('click')
  }
}

</script>

<style scoped></style>