<template>
  <Button @click="goBack" class="!px-6.5 mt-19 lg:mt-27" color="indigo" v-if="hasHistory">
    <ArrowLeftIcon class="inline w-3.5 mr-1.5 -ml-2.2 -mt.7" />{{ t("back") }}
  </Button>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/solid"

const router = useRouter()
const hasHistory = ref(false)

watchEffect(() => {
  if (window !== undefined) {
    hasHistory.value = window.history.length > 1
  }
})

const goBack = () => {
  router.back()
}

const { t } = useI18n()
</script>

<i18n lang="json">{
  "de": {
    "back": "Zurück"
  },
  "en": {
    "back": "Back"
  }
}</i18n>

<style scoped></style>
