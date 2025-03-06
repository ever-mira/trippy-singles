<template>
  <Page>
    <Heading>
      {{ t("title") }}
      <template v-slot:subtitle>
        {{ t("subtitle") }}
      </template>
    </Heading>

    <div class="mt-11 w-full lg:w-200">
      <div class="mb-7">
        <photo-upload @uploaded="onPhotoUploaded" category="report" :preview="true" class="mt-6"></photo-upload>
      </div>
      <div class="flex gap-x-3 mb-3">
        <select v-model="report.drug_id"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-800 shadow-sm pl-2 pr-4 py-2 bg-white dark:bg-black text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
          <option :value="null" selected>{{ t("select_drug") }}</option>
          <option v-for="drug in drugs" :value="drug.id">{{ drug.name }}</option>
        </select>
        <select v-model="report.long_term"
          class="w-full rounded-lg border border-gray-300 dark:border-gray-800 shadow-sm pl-2 pr-4 py-2 bg-white dark:bg-black text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
          <option :value="false" selected>{{ t("normal_report") }}</option>
          <option :value="true">{{ t("long_term_report") }}</option>
        </select>
      </div>
      <div class="mb-5">
        <Input type="text" :placeholder="t('report_title')" v-model="report.title" autofocus class="!w-full"
          maxlength="50" />
      </div>
      <div v-if="report.long_term === false">
        <div class="mb-3">
          {{ t("describe_set_and_setting") }}
        </div>
        <div class="flex flex-col md:flex-row gap-3 mb-3">
          <Textarea type="text" :placeholder="t('set')" v-model="report.set" class="!w-full h-20 resize-none"
            maxlength="500" />
          <Textarea type="text" :placeholder="t('setting')" v-model="report.setting" class="!w-full h-20 resize-none"
            maxlength="500" />
        </div>
      </div>
      <HintBox class="my-3" name="every_report_little_magic" :icon="SparklesIcon" triggerRight>
        {{ t("every_report_little_magic") }}</HintBox>
      <div class="md:hidden mb-3">
        {{ t("describe_your_trip") }}
      </div>
      <div class="mb-3">
        <Textarea type="text" :placeholder="t('describe_your_experiences')" v-model="report.text"
          class="!w-full h-90 resize-none" maxlength="50000" />
      </div>
      <div class="mb-7" v-if="message">
        {{ message }}
      </div>

      <div class="mt-5 mb-50">
        <Button color="red" to="/reports" class="!px-5.5">
          {{ t("cancel") }}
        </Button>
        <Button color="indigo" @click="save" class="ml-4 !px-5.5">
          {{ t("save") }}
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
import { SparklesIcon } from "@heroicons/vue/24/outline"

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

const { t } = useI18n()
</script>


<style></style>


<i18n lang="json">{
  "de": {
    "title": "Neuer Trip-Bericht",
    "subtitle": "Beschreibe deine Erlebnisse",
    "select_drug": "Droge auswählen",
    "normal_report": "Normaler Bericht",
    "long_term_report": "Langzeitbericht",
    "report_title": "Titel",
    "describe_set_and_setting": "Beschreibe Set und Setting:",
    "set": "Set",
    "setting": "Setting",
    "every_report_little_magic": "Jeder Trip-Bericht ist ein kleines Stück Zauberei.",
    "describe_your_trip": "Beschreibe Deinen Trip:",
    "describe_your_experiences": "Beschreibe deine Erlebnisse",
    "cancel": "Abbrechen",
    "save": "Speichern"
  },
  "en": {
    "title": "New Trip Report",
    "subtitle": "Describe your Experiences",
    "select_drug": "Select Drug",
    "normal_report": "Normal Report",
    "long_term_report": "Long-Term Report",
    "report_title": "Title",
    "describe_set_and_setting": "Describe Set and Setting:",
    "set": "Set",
    "setting": "Setting",
    "every_report_little_magic": "Every Trip-Report is a little piece of magic.",
    "describe_your_trip": "Describe your Trip:",
    "describe_your_experiences": "Describe your Experiences",
    "cancel": "Cancel",
    "save": "Save"
  }
}</i18n>