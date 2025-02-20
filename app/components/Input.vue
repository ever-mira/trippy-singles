<template>
  <input v-bind="$attrs" :value="modelValue" @input="onInput" @focus="onFocus" @blur="onBlur" @keydown="onKeydown"
    :class="classes" ref="inputRef" />
  <div class="inline -ml-6.5" v-if="props.loading"><svg id="spinner"
      class="inline w-5 h-5 -mt-1 -ml-1 mr-2 animate-spin text-gray-500" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" stroke-width="4" stroke="currentColor" stroke-opacity="0.25"></circle>
      <path d="M4 12a8 8 0 0 1 16 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></path>
    </svg></div>
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
  loading: {
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

onMounted(async () => {
  if (props.focus) {
    await nextTick()
    inputRef.value?.focus()
  }
})

const classes = "px-3 py-1.2 w-full border-1.7 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-gray-500 focus:shadow-sm rounded-lg outline-none"
</script>

<style scoped></style>