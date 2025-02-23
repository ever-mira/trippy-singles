<template>
  <Page>
    <Heading v-if="report">
      {{ report.title }}
      <template v-slot:subtitle>
        {{ report.drugs.name }} - <NuxtLink :to="`/@${report.profiles.username}`"
          class="text-blue-600 hover:text-blue-500">{{
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
        class="rounded-lg max-w-65 md:max-w-83 mt-10 cursor-pointer" v-if="report.avatar_url"
        @click="showModal(report.avatar_url)" />
      <PlaceholderPhoto v-else />

      <div class="flex mt-9">
        <div class="grow border-l border-gray-3 pl-3">
          <div class="font-bold">Droge:</div>
          {{ report.drugs.name }}
        </div>
        <div>
          <div class="font-bold text-right">Datum:</div>
          {{ formattedDate }}
        </div>
      </div>

      <div class="mt-9 border-l border-gray-3 pl-3">
        <div class="font-bold">Set:</div>
        {{ report.set }}
      </div>
      <div class="mt-9 border-l border-gray-3 pl-3">
        <div class="font-bold">Setting:</div>
        {{ report.setting }}
      </div>
      <div class="mt-9">
        <div class="font-bold mb-2">Trip-Bericht:</div>
        <div class="whitespace-pre-wrap">
          {{ report.text }}
        </div>
      </div>
    </div>

    <BackButton />

  </Page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { format } from "date-fns"
import { de } from "date-fns/locale"

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