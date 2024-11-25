<template>
  <div class="text-left">
    <label class="mt-9 py-2 px-4 bg-gray-100 dark:bg-gray-900 cursor-pointer text-center rounded-md">
      <input id="file-input" ref="fileInput" class="hidden" type="file" @change="imageSelected($event)" />
      <span v-if="props.change">
        {{ $t('profile.change_image') }}
      </span>
      <span v-else>
        {{ $t('profile.select_image') }}
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
    const response = await $fetch<saveResponse>('/api/upload', {
      method: 'POST',
      body: imageFormData
    })

    if (response && response.url) {
      emit('uploaded', response.url)
    } else {
      throw new Error('Keine URL im Server-Response enthalten.')
    }
  } catch (error: any) {
    console.error('Upload fehlgeschlagen:', error.message || error)
    throw new Error('Upload fehlgeschlagen.')
  }
}
</script>
