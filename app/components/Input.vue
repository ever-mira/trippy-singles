<template>
  <input v-bind="$attrs" :value="modelValue" @input="onInput" @focus="onFocus" @blur="onBlur" @keydown="onKeydown"
    :class="classes" ref="inputRef" />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
  },
  focus: {
    type: Boolean,
    default: false,
  },
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

const inputRef = useTemplateRef('inputRef')

onMounted(() => {
  if (props.focus) {
    inputRef.value?.focus()
  }
})

const classes = "px-3 py-1.4 w-full md:w-[210px] border-1.7 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-gray-500 focus:shadow-sm rounded-lg outline-none"
</script>

<style scoped></style>