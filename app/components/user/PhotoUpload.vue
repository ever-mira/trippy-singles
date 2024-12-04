<template>
  <div class="text-left">
    <label class="mt-9 py-2 px-4 bg-gray-100 text-md dark:bg-gray-900 cursor-pointer text-center rounded-md">
      <input id="file-input" ref="fileInput" class="hidden" type="file" @change="imageSelected($event)" />

      <svg id="spinner" class="inline w-5 h-5 -mt-1 -ml-1 mr-2 animate-spin text-gray-500"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" v-if="uploading">
        <circle cx="12" cy="12" r="10" stroke-width="4" stroke="currentColor" stroke-opacity="0.25"></circle>
        <path d="M4 12a8 8 0 0 1 16 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></path>
      </svg>

      <span v-if="props.change && !uploading">
        {{ $t('profile.change_image') }}
      </span>
      <span v-if="!props.change && !uploading">
        {{ $t('profile.select_image') }}
      </span>
      <span v-if="uploading">
        saving...&nbsp;
      </span>
    </label>
    <span class="block mt-4" v-if="message">{{ message }}</span>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

let image = ref()
let fileInput = ref(null)
let message = ref('')
let uploading = ref(false)

const props = defineProps({
  change: { type: Boolean, default: false },
})

const emit = defineEmits(['uploaded'])

let imageSelected = (event: any) => {
  message.value = ''

  if (event.target.files.length > 0) {
    const file = event.target.files[0]

    if (file.size / 1000000 > 2) {
      message.value = 'Bild zu groß. (maximal 2mb)'
    } else {
      image.value = file
      const reader = new FileReader()
      reader.readAsDataURL(image.value)
      reader.onload = e => {
        save()
      }
    }
  }
}

interface saveResponse {
  url: string
}

let save = async () => {
  if (!image.value) return

  const imageFormData = new FormData()
  imageFormData.append('photo', image.value)

  try {
    uploading.value = true
    const response = await $fetch<saveResponse>('/api/upload', {
      method: 'POST',
      body: imageFormData
    })
    setTimeout(() => {
      uploading.value = false
    }, 1100)

    if (response && response.url) {
      emit('uploaded', response.url)
    } else {
      throw new Error('Keine URL im Server-Response enthalten.')
    }
  } catch (error: any) {
    console.error('Upload fehlgeschlagen:', error.message || error)
    uploading.value = false
    throw new Error('Upload fehlgeschlagen.')
  }
}
</script>
