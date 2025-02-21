<template>
  <textarea v-bind="$attrs" :value="modelValue" @input="onInput" @focus="onFocus" @blur="onBlur" @keydown="onKeydown"
    :class="classes" autofocus />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  modelValue: {
    type: String,
  }
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'keydown'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const onFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const onBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const onKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const classes = "px-3 py-1.7 w-full border-1.7 bg-white bg-opacity-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-gray-500 focus:shadow-sm rounded-md outline-none resize-none"
</script>

<style scoped></style>