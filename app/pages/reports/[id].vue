<template>
  <Page>
    <Heading v-if="report">
      {{ report.title }}
      <template v-slot:subtitle>
        {{ report.drugs.name }} -
        <NuxtLink :to="`/@${report.profiles.username}`" class="text-blue-600 hover:text-blue-500">{{
          report.profiles.username }}
        </NuxtLink>
      </template>
    </Heading>

    <Heading v-else>
      {{ t("report_not_found") }}
      <template v-slot:subtitle>
        404
        <div class="h-20"></div>
      </template>
    </Heading>

    <div class="mt-9" v-if="report">
      <ReportPicture :report="report" />
      <div class="flex flex-col gap-y-8 border-r pr-3 mt-7 2xl:w-85% 3xl:w-80%">
        <ReportMeta :report="report" />

        <div class="mt-4">
          <div class="font-bold mb-2">{{ t("trip_report") }}</div>
          <div class="whitespace-pre-wrap">
            {{ report.text }}
          </div>
          <ReportLikes :reportId="reportId" />
        </div>
      </div>

      <div class="mt-17 lg:pl-8 xl:pl-10 w-full md:w-3/4 xl:w-1/2">
        <Comments category="reports" :resourceId="reportId">
          <template v-slot:hint>
            {{ t("comment_hint") }}
          </template>
        </Comments>
      </div>
    </div>

    <BackButton />
  </Page>
</template>


<script setup lang="ts">
import { useRoute } from "vue-router"
import ReportPicture from "~/components/reports/ReportPicture.vue"
import ReportMeta from "~/components/reports/ReportMeta.vue"
import ReportLikes from "~/components/reports/ReportLikes.vue"
import Comments from "~/components/shared/Comments.vue"

const route = useRoute()
const { report, loadReport } = useReports()

const reportId = route.params.id as string

if (reportId) {
  await loadReport(reportId)
}

const { t } = useI18n()
</script>


<i18n lang="json">{
  "de": {
    "report_not_found": "Bericht nicht gefunden",
    "trip_report": "Trip-Bericht:",
    "comment_hint": "(ähnliches erlebt? Ergänze deine Erfahrungen)"
  },
  "en": {
    "report_not_found": "Report not found",
    "trip_report": "Trip Report:",
    "comment_hint": "(experienced something similar? Add your experience)"
  }
}</i18n>