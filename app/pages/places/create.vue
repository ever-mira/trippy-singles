<template>
  <Page>
    <Heading>
      Ort eintragen
      <template v-slot:subtitle>
        füge einen neuen Ort hinzu
      </template>
    </Heading>

    <div class="mt-11 w-100">
      <div class="mb-7">
        <photo-upload @uploaded="onPhotoUploaded" category="place" :preview="true" class="mt-6"></photo-upload>
      </div>
      <div class="mb-3">
        <Input type="text" placeholder="Name des Ortes" v-model="place.name" autofocus class="!w-full" />
      </div>
      <div class="mb-3">
        <Textarea type="text" placeholder="Beschreibung" v-model="place.description" class="!w-full h-35 resize-none" />
      </div>
      <div class="mb-7">
        <Input type="text" placeholder="Website" v-model="place.website" class="!w-full" />
      </div>
      <div class="mb-7" v-if="message">
        {{ message }}
      </div>

      <div class="mt-10 mb-50">
        <Button color="red" to="/places" class="!px-5.5">
          Abbrechen
        </Button>
        <Button color="indigo" @click="save" class="ml-4 !px-5.5">
          Speichern
        </Button>
      </div>
    </div>

    <!-- preload CDN images -->
    <ImagePreload :url="place.avatar_url" v-if="place.avatar_url" />
  </Page>
</template>

<script setup lang="ts">
import PhotoUpload from '~/components/user/PhotoUpload.vue'
import ImagePreload from '~/components/app/ImagePreload.vue'


const place = reactive({
  name: '',
  description: '',
  website: '',
  avatar_url: ''
})

const message = ref('')
const user = useSupabaseUser()
const router = useRouter()

async function save() {
  message.value = ''

  try {
    if (!place.name || !place.description) {
      message.value = 'Name und Beschreibung sind erforderlich'
      return
    }

    if (!user.value) {
      message.value = 'Du musst eingeloggt sein, um einen Ort erstellen zu können.'
      return
    }

    const result = await $fetch('/api/places', {
      method: 'POST',
      body: toRaw(place),
      headers: useRequestHeaders(['cookie'])
    })

    router.push('/places')

  } catch (error: any) {
    message.value = error.message
  }
}

const onPhotoUploaded = (url: string) => {
  place.avatar_url = url
}
</script>

<style></style>
