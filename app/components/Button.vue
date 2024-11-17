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
const slots = useSlots();


const baseClasses = 'text-white font-medium focus:outline-none rounded-xl rounded-lg cursor-pointer font-semibold text-center shadow-xs transition-all duration-100'

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'small':
      return 'px-4.5 py-2 text-sm'
    case 'large':
      return 'py-2.3 px-9 text-sm'
    default:
      return 'py-2.3 px-9 text-sm'
  }
})

const colorClasses = computed(() => {
  switch (props.color) {
    case 'indigo':
      return 'bg-indigo-200 !text-indigo-800 dark:!text-indigo-200 hover:bg-indigo-300 dark:bg-indigo-800 dark:hover:bg-indigo-700'
    case 'red':
      return 'bg-red-100 !text-red-600 dark:!text-red-200 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800'
    case 'transparent':
      return '!text-gray-800 !dark:text-gray-300'
    default:
      return 'bg-indigo-200 !text-indigo-800 dark:!text-indigo-200 hover:bg-indigo-300 dark:bg-indigo-800 dark:hover:bg-indigo-700'
  }
})

const handleClick = () => {
  if (!props.to) {
    emit('click')
  }
}

</script>

<style scoped></style>