<template>
  <div class="border-l border-gray-3 pl-3">
    <div class="text-xl">
      <SparklesIcon class="inline w-5.5 text-gray-900 dark:text-gray-200 -mt-1 mr-2" />Action
    </div>

    <div class="lg:text-lg" v-if="profile">
      <div class="mt-6 lg:mt-7" v-if="profile.created_at">
        <div class="grow font-semibold">{{ formatDate(profile.created_at) }}</div>
        <div class="grow mt-2">
          <CakeIcon class="inline w-5 -mt-1 mr-2" />Bei Trippy angemeldet
        </div>
      </div>

      <div class="mt-3 lg:mt-4" v-for="report in reports" :class="{ 'mt-6 lg:mt-7': report.formattedDate }">
        <div class="grow font-semibold">{{ report.formattedDate }}</div>
        <div class="grow mt-2">
          <NuxtLink :to="`/reports/${report.id}`">
            <PencilIcon class="inline w-5 -mt-1 mr-2" /><span class="underline">Trip-Bericht</span> über <span
              class="font-semibold">{{ report.drugs.name
              }}</span>: "<span class="font-italic">{{ report.title }}</span>"
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { SparklesIcon } from '@heroicons/vue/24/outline'
import { CakeIcon } from '@heroicons/vue/24/outline'
import { PencilIcon } from '@heroicons/vue/24/outline'
import { type ExtendedReport } from "~~/types/extended.types"

const { profile } = useProfile()

const { data: reports } = await useFetch<ExtendedReport[]>("/api/reports/" + `?user_id=${profile.value?.user_id}`, {
  method: "GET",
  headers: useRequestHeaders(["cookie"]),
})

let previousDate: string = ''

if (reports.value) {
  reports.value.forEach((report) => {
    let formattedDate: string = formatDate(report.created_at)
    if (formattedDate !== previousDate) {
      report.formattedDate = formattedDate
    }
    previousDate = formattedDate
  })
}

function formatDate(dateString: string) {
  let formattedDate: string = format(new Date(dateString), "d. MMMM yyyy", { locale: de })
  return formattedDate
}

</script>
