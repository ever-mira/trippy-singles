<template>
  <Page>
    <Heading>
      Ort erstellen
      <template v-slot:subtitle>
        füge einen neuen Ort hinzu
      </template>
    </Heading>

    <div class="mt-11">
      <div class="mb-3">
        <Input type="text" placeholder="Name des Ortes" v-model="placeData.name" autofocus class="!w-80" />
      </div>
      <div class="mb-3">
        <Textarea type="text" placeholder="Beschreibung" v-model="placeData.description" class="!w-80" />
      </div>
      <div class="mb-7">
        <Input type="text" placeholder="Website" v-model="placeData.website" class="!w-80" />
      </div>
      <div class="mb-7" v-if="message">
        {{ message }}
      </div>
      <div>
        <Button color="indigo" @click="save" class="!px-5">
          Speichern
        </Button>
      </div>
    </div>

  </Page>
</template>

<script setup lang="ts">
const placeData = reactive({
  name: '',
  description: '',
  website: ''
})

const message = ref('')
const user = useSupabaseUser()

async function save() {
  message.value = ''

  try {
    if (!placeData.name || !placeData.description) {
      message.value = 'Name und Beschreibung sind erforderlich'
      return
    }

    if (!user.value) {
      message.value = 'Du musst eingeloggt sein, um einen Ort erstellen zu können.'
      return
    }

    const result = await $fetch('/api/places', {
      method: 'POST',
      body: toRaw(placeData),
      headers: useRequestHeaders(['cookie'])
    })

    message.value = 'Ort wurde erstellt.'

  } catch (error: any) {
    message.value = error.message
  }
}
</script>

<style></style>
