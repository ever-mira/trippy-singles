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
      Report not found
      <template v-slot:subtitle>
        404
        <div class="h-20"></div>
      </template>
    </Heading>

    <div class="mt-9 lg:mt-11" v-if="report">
      <NuxtImg :src="report.avatar_url || undefined" width="700"
        class="rounded-lg max-w-65 md:max-w-77 mt-10 cursor-pointer" v-if="report.avatar_url"
        @click="showModal(report.avatar_url)" />
      <PlaceholderPhoto v-else />

      <div class="flex flex-col gap-y-9 border-r pr-3 mt-7">
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
        <div class="border-l border-gray-3 pl-3">
          <div class="font-bold">Set:</div>
          {{ report.set }}
        </div>
        <div class="border-l border-gray-3 pl-3">
          <div class="font-bold">Setting:</div>
          {{ report.setting }}
        </div>

        <div class="">
          <div class="font-bold mb-2">Trip-Bericht:</div>
          <div class="whitespace-pre-wrap">
            {{ report.text }}
          </div>
        </div>
      </div>
      <div class="py-4 lg:pl-8 xl:pl-10 mt-17 2xl:mt-18 md:w-3/4 xl:w-1/2 w-full">
        <ReportComments />
      </div>
    </div>

    <BackButton />
  </Page>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import ReportComments from "~/components/reports/ReportComments.vue"

const route = useRoute()
const { report, loadReport } = useReports()

const id = route.params.id

if (id) {
  await loadReport(id as string)
}

const { showModal } = useImageModal()

const formattedDate = computed(() => {
  if (report.value) {
    return format(new Date(report.value.created_at), "d. MMMM yyyy HH:mm", { locale: de })
  }
})
</script>
