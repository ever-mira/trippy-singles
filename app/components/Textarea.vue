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

const classes = "px-3 py-1.3 w-full md:w-[200px] border-1.7 border-indigo-200 focus:border-indigo-400 rounded-md outline-none"
</script>

<style scoped></style>