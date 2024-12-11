<template>
  <Page>
    <Heading>
      Veranstaltung eintragen
      <template v-slot:subtitle>
        trage eine neue Veranstaltung ein.
      </template>
    </Heading>

    <div class="mt-11 w-100">
      <div class="mb-3">
        <Input type="text" placeholder="Name der Veranstaltung" v-model="event.name" autofocus class="!w-full" />
      </div>
      <div class="mb-3">
        <Textarea type="text" placeholder="Beschreibung" v-model="event.description" class="!w-full h-40 resize-none" />
      </div>
      <div class="mb-7">
        <Input type="text" placeholder="Ort" v-model="event.location" class="!w-full" />
      </div>
      <div class="mb-7">
        <VDatePicker v-model="event.date" mode="dateTime" is24hr :isDark="isDark" />
      </div>

      <div class="mb-7" v-if="message">
        {{ message }}
      </div>

      <div class="mt-10">
        <Button color="indigo" @click="save" class="!px-5.5">
          Speichern
        </Button>
        <Button color="red" to="/events" class="ml-4 !px-5.5">
          Abbrechen
        </Button>
      </div>
    </div>

  </Page>
</template>

<script setup lang="ts">
const event = reactive({
  name: '',
  description: '',
  website: '',
  location: '',
  date: new Date()
})

const message = ref('')
const user = useSupabaseUser()

async function save() {
  message.value = ''

  try {
    if (!event.name || !event.description) {
      message.value = 'Name und Beschreibung sind erforderlich'
      return
    }

    if (!user.value) {
      message.value = 'Du musst eingeloggt sein, um eine Veranstaltung erstellen zu können.'
      return
    }

    const result = await $fetch('/api/events', {
      method: 'POST',
      body: toRaw(event),
      headers: useRequestHeaders(['cookie'])
    })

    message.value = 'Veranstaltung wurde erstellt.'

  } catch (error: any) {
    message.value = error.message
  }
}

const { isDark } = useApp()
</script>

<style></style>
