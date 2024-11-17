<template>
    <input v-bind="$attrs" :value="modelValue" @input="onInput" @focus="onFocus" @blur="onBlur" @keydown="onKeydown"
        :class="classes" />
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

const classes = "px-3 py-1.3 w-[200px] border-1.7 border-indigo-300 focus:border-indigo-400 rounded-md outline-none"
</script>

<style scoped>
.input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
}

.input:focus {
    border-color: #007bff;
    outline: none;
}
</style>