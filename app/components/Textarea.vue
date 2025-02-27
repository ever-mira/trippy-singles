<template>
  <textarea v-bind="$attrs" :value="modelValue" @input="onInput" @focus="onFocus" @blur="onBlur" @keydown="onKeydown"
    :class="classes" ref="textAreaRef" />
</template>

<script setup lang="ts">
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

const textAreaRef = useTemplateRef('textAreaRef')

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

const classes = "px-3 py-1.5 w-full border-1.7 bg-white bg-opacity-50 dark:bg-gray-950 border-gray-300 dark:border-gray-700 focus:border-indigo-400 dark:focus:border-gray-500 focus:shadow-sm rounded-md outline-none resize-none"

onMounted(async () => {
  if (props.focus) {
    await nextTick()
    textAreaRef.value?.focus()
  }
})
</script>

<style scoped></style>