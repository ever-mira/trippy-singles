<template>
  <Page>
    <Heading>
      Trip-Bericht schreiben
      <template v-slot:subtitle>
        Beschreibe deine Erfahrungen
      </template>
    </Heading>

    <div class="mt-11 w-full lg:w-200">
      <div class="mb-7">
        <photo-upload @uploaded="onPhotoUploaded" category="report" :preview="true" class="mt-6"></photo-upload>
      </div>
      <div class="flex gap-x-3 mb-3">
        <select v-model="report.drug_id"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-800 shadow-sm pl-2 pr-4 py-2 bg-white dark:bg-black text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
          <option :value="null" selected>Droge auswählen</option>
          <option v-for="drug in drugs" :value="drug.id">{{ drug.name }}</option>
        </select>
        <select v-model="report.long_term"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-800 shadow-sm pl-2 pr-4 py-2 bg-white dark:bg-black text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
          <option :value="false" selected>Normaler Bericht</option>
          <option :value="true">Langzeitbericht</option>
        </select>
      </div>
      <div class="mb-5">
        <Input type="text" placeholder="Titel" v-model="report.title" autofocus class="!w-full" />
      </div>
      <div v-if="report.long_term === false">
        <div class="mb-3">
          Beschreibe Set und Setting:
        </div>
        <div class="flex flex-col md:flex-row gap-3 mb-3">
          <Textarea type="text" placeholder="Set" v-model="report.set" class="!w-full h-20 resize-none" />
          <Textarea type="text" placeholder="Setting" v-model="report.setting" class="!w-full h-20 resize-none" />
        </div>
      </div>
      <div class="mb-3">
      </div>
      <div class="md:hidden mb-3">
        Beschreibe Deinen Trip:
      </div>
      <div class="mb-3">
        <Textarea type="text" placeholder="Beschreibe deine Erfahrungen" v-model="report.text"
          class="!w-full h-90 resize-none" />
      </div>
      <div class="mb-7" v-if="message">
        {{ message }}
      </div>

      <div class="mt-10 mb-50">
        <Button color="red" to="/reports" class="!px-5.5">
          Abbrechen
        </Button>
        <Button color="indigo" @click="save" class="ml-4 !px-5.5">
          Speichern
        </Button>
      </div>
    </div>

    <!-- preload CDN images -->
    <ImagePreload :url="report.avatar_url" v-if="report.avatar_url" />
  </Page>
</template>

<script setup lang="ts">
import PhotoUpload from '~/components/user/PhotoUpload.vue'
import ImagePreload from '~/components/app/ImagePreload.vue'

const report = reactive({
  drug_id: null,
  title: '',
  set: '',
  setting: '',
  text: '',
  avatar_url: '',
  long_term: false
})

const message = ref('')
const user = useSupabaseUser()
const router = useRouter()
const { resetDrugFilter } = useReports()

const drugs = await $fetch('/api/drugs', {
  method: 'GET',
  headers: useRequestHeaders(['cookie'])
})

async function save() {
  message.value = ''

  try {
    if (!report.drug_id) {
      message.value = 'Wähle eine Droge aus.'
      return
    }

    if (!report.title || !report.text) {
      message.value = 'Titel und Text sind erforderlich.'
      return
    }

    if (!user.value) {
      message.value = 'Du musst eingeloggt sein, um einen Trip-Bericht erstellen zu können.'
      return
    }

    await $fetch('/api/reports', {
      method: 'POST',
      body: toRaw(report),
      headers: useRequestHeaders(['cookie'])
    })

    resetDrugFilter()
    router.push('/reports')

  } catch (error: any) {
    message.value = error.message
  }
}

const onPhotoUploaded = (url: string) => {
  report.avatar_url = url
}
</script>

<style></style>
