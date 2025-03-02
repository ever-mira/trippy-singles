<template>
  <div class="flex flex-row">
    <div class="grow border-l border-gray-3 pl-3">
      <div class="font-bold">{{ t("drug") }}</div>
      {{ report.drugs.name }}
    </div>
    <div>
      <div class="font-bold text-right">{{ t("date") }}</div>
      {{ formattedDate }}
    </div>
  </div>

  <div v-if="report.long_term">
    <div class="border-l border-gray-3 pl-3">
      <div class="font-bold">{{ t("long_term_report") }}</div>
      {{ t("yes") }}
    </div>
  </div>
  <template v-else>
    <div class="border-l border-gray-3 pl-3">
      <div class="font-bold">{{ t("set") }}</div>
      <span v-if="report.set">{{ report.set }}</span>
      <span v-else>-</span>
    </div>
    <div class="border-l border-gray-3 pl-3">
      <div class="font-bold">{{ t("setting") }}</div>
      <span v-if="report.setting">{{ report.setting }}</span>
      <span v-else>-</span>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { ExtendedReport } from '~~/types/extended.types';
import { format } from "date-fns"
import { de } from "date-fns/locale"

const props = defineProps<{ report: ExtendedReport }>()

const formattedDate = computed(() => {
  if (props.report) {
    return format(new Date(props.report.created_at), "d. MMMM yyyy HH:mm", { locale: de })
  }
})

const { t } = useI18n()
</script>


<i18n lang="json">{
  "de": {
    "drug": "Droge:",
    "date": "Datum",
    "long_term_report": "Langzeit-Bericht:",
    "yes": "Ja",
    "set": "Set:",
    "setting": "Setting:"
  },
  "en": {
    "drug": "Drug:",
    "date": "Date",
    "long_term_report": "Long-Term Report:",
    "yes": "Yes",
    "set": "Set:",
    "setting": "Setting:"
  }
}</i18n>


<style scoped></style>