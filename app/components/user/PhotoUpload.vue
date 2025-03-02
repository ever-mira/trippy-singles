<template>
  <div class="text-left">

    <label for="file-input"
      class="mt-9 py-2 px-4 bg-gray-100 text-md dark:bg-gray-900 cursor-pointer text-center rounded-md"
      v-if="!props.preview">

      <svg id="spinner" class="inline w-5 h-5 -mt-1 -ml-1 mr-2 animate-spin text-gray-500"
        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" v-if="uploading">
        <circle cx="12" cy="12" r="10" stroke-width="4" stroke="currentColor" stroke-opacity="0.25"></circle>
        <path d="M4 12a8 8 0 0 1 16 0" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></path>
      </svg>

      <span v-if="props.change && !uploading">
        {{ t('change_image') }}
      </span>
      <span v-if="!props.change && !uploading">
        {{ t('select_image') }}
      </span>
      <span v-if="uploading">
        saving...&nbsp;
      </span>
    </label>

    <label for="file-input" v-if="props.preview" class="cursor-pointer">
      <img :src="previewImage" class="rounded-lg mx-auto" v-if="previewImage" />
      <div v-else class="rounded-lg border dark:border-gray-800 ">
        <img src="/assets/placeholder.png" class="dark:hidden w-50% lg:w-42% mx-auto" />
        <img src="/assets/placeholder_dark.png" class="hidden dark:block w-50% lg:w-42% mx-auto" />
      </div>

    </label>

    <input id="file-input" ref="fileInput" class="hidden" type="file" @change="onImageSelected($event)" />
    <span class="block mt-4" v-if="message">{{ message }}</span>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'

let uppy: any = null
let message = ref('')
let uploading = ref(false)
let previewImage = ref<string | null>(null)

const props = defineProps({
  category: { type: String, required: true },
  change: { type: Boolean, default: false },
  preview: { type: Boolean, default: false },
})

const emit = defineEmits(['uploaded'])

onMounted(() => {
  uppy = new Uppy({
    autoProceed: true,
  })

  uppy.use(XHRUpload, {
    endpoint: `/api/upload/${props.category}`,
    fieldName: 'photo',
  })

  uppy.on('file-added', (file: any) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      previewImage.value = fileReader.result as string
    }
    fileReader.readAsDataURL(file.data)
  })

  uppy.on('upload-success', (file: any, response: any) => {
    if (response && response.body.url) {
      emit('uploaded', response.body.url)

      setTimeout(() => {
        uploading.value = false
      }, 1100)
    } else {
      throw new Error('Keine URL im Server-Response enthalten.')
    }
  })

  uppy.on('upload-error', (file: any, error: any, response: any) => {
    console.error('Upload fehlgeschlagen:', error.message || error)
  })
})

let onImageSelected = (event: any) => {
  message.value = ''
  if (event.target.files.length > 0) {
    const file = event.target.files[0]

    if (file.size / 1000000 > 4) {
      message.value = 'Bild zu groß. (maximal 2mb)'
    } else {
      uploading.value = true
      uppy.addFile({
        name: file.name,
        type: file.type,
        data: file,
      })
    }
  }
}

const { t } = useI18n()
</script>

<i18n lang="json">{
  "de": {
    "change_image": "Bild ändern",
    "select_image": "Bild auswählen"
  },
  "en": {
    "change_image": "Change Picture",
    "select_image": "Select Picture"
  }
}</i18n>
