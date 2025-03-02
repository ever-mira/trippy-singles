<template>
  <Page>
    <div class="flex flex-col lg:flex-row w-full">
      <div class="flex-1">
        <Heading>
          {{ t("title") }}
          <template v-slot:subtitle>{{ t("subtitle") }}</template>
        </Heading>
      </div>

      <div class="flex-1">
        <div class="mt-11 lg:mt-4">
          <Button color="indigo" to="/reports/create" class="!px-5">
            <PlusIcon class="inline w-5 mr-1.5 lg:mr-1 -mt.5" />

            <PencilIcon class="inline w-4 lg:mr-2 -mt.5" />
            <span class="hidden md:inline">{{ t("create_button") }}</span>
          </Button>
        </div>
      </div>

      <div class="flex-1"></div>
    </div>

    <ReportFilter />

    <ReportGrid v-if="reports">
      <ReportTile v-for="report in reports" :report="report" :key="report.id" />
    </ReportGrid>

    <div v-if="reports && reports.length === 0" class="text-gray-700">
      {{ t("no_reports_yet") }}
    </div>

    <HintBox class="mt-19 lg:mt-22" name="every_should_trip_reports" :icon="RocketLaunchIcon">
      {{ t("everybody_should_have_written") }}</HintBox>
  </Page>
</template>

<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/solid"
import { PencilIcon } from "@heroicons/vue/24/solid"
import { RocketLaunchIcon } from "@heroicons/vue/24/outline"
import ReportTile from "~/components/reports/ReportTile.vue"
import ReportFilter from "~/components/reports/ReportFilter.vue"
import ReportGrid from "~/components/reports/ReportGrid.vue"

const { reports, loadReports, drugFilter, longTermFilter } = useReports()

loadReports()

watch(drugFilter, () => {
  loadReports()
})
watch(longTermFilter, () => {
  loadReports()
})

const { t } = useI18n()
</script>


<style></style>


<i18n lang="json">{
  "de": {
    "title": "Trip-Berichte",
    "subtitle": "Teile deine Erlebnisse",
    "create_button": "Trip-Bericht",
    "no_reports_yet": "Noch keine Berichte zu dieser Droge.",
    "everybody_should_have_written": "Jeder sollte einen Trip-Bericht geschrieben haben."
  },
  "en": {
    "title": "Trip Reports",
    "subtitle": "Share your Experiences",
    "create_button": "Trip Report",
    "no_reports_yet": "No reports on this drug yet.",
    "everybody_should_have_written": "Everyone should have written a trip report."
  }
}</i18n>