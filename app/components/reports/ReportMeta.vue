<template>
  <div class="flex flex-row">
    <div class="grow border-l border-gray-3 pl-3">
      <div class="font-bold">Droge:</div>
      {{ report.drugs.name }}
    </div>
    <div>
      <div class="font-bold text-right">Datum</div>
      {{ formattedDate }}
    </div>
  </div>

  <div v-if="report.long_term">
    <div class="border-l border-gray-3 pl-3">
      <div class="font-bold">Langzeit-Bericht:</div>
      Ja
    </div>
  </div>
  <template v-else>
    <div class="border-l border-gray-3 pl-3">
      <div class="font-bold">Set:</div>
      <span v-if="report.set">{{ report.set }}</span>
      <span v-else>-</span>
    </div>
    <div class="border-l border-gray-3 pl-3">
      <div class="font-bold">Setting:</div>
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
</script>

<style scoped></style>
