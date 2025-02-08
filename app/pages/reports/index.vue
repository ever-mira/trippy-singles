<template>
  <Page>

    <div class="flex flex-col lg:flex-row w-full">
      <div class="flex-1">
        <Heading>
          Trip-Berichte
          <template v-slot:subtitle>
            Teile deine Erfahrungen
          </template>
        </Heading>
      </div>

      <div class="flex-1">
        <div class="mt-11 lg:mt-4">
          <Button color="indigo" to="/reports/create" class="!px-5">
            <PlusIcon class="inline w-4.5 mr-2 -mt.5" />Trip-Bericht erstellen
          </Button>
        </div>
      </div>

      <div class="flex-1">
      </div>
    </div>


    <div class="flex flex-col md:flex-row mt-12 md:mt-11">
      <div class="md:w-auto mb-2 text-[1.13rem] leading-8 text-gray-800 dark:text-gray-200">Nach Droge filtern:
      </div>
      <select v-model="filter_drug_id"
        class="rounded-lg border border-gray-300 dark:border-gray-800 shadow-sm pl-2 pr-4 py-2 md:ml-4.5 text-sm bg-white dark:bg-black font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
        <option :value="null" selected>Alle</option>
        <option v-for="drug in drugs" :value="drug.id">{{ drug.name }}</option>
      </select>
    </div>


    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 -ml-5 mt-15 gap-x-.5 lg:gap-x-5 gap-y-5 lg: gap-y-4 xl:max-w-90% 2xl:max-w-75%"
      v-if="reports">

      <NuxtLink :to="`/reports/${report.id}`"
        class="block ml-3 bg-blue-50 hover:bg-blue-100 dark:bg-gray-950 dark:hover:bg-gray-900 bg-opacity-40 hover:bg-opacity-40 py-3 pl-2 pr-5 rounded-xl"
        v-for="report in reports" :key="report.id">

        <div class="flex">
          <div class="flex grow">
            <NuxtImg :src="report.avatar_url || ''" class="w-15 rounded-full" height="70" width="70" fit="cover"
              v-if="report.avatar_url" />
            <PlaceholderPhotoSmall v-else />
            <div class="py-.5 px-3">
              <div>{{ report.title }}</div>
              <div class="text-sm text-gray-500">{{ report.profiles.username }}</div>
            </div>
          </div>
          <div class="text-right font-medium">{{ report.drugs.name }}</div>
        </div>

      </NuxtLink>

    </div>
    <div v-if="reports.length === 0" class="text-gray-700">
      Noch keine Berichte zu dieser Droge.
    </div>
    <div class="h-80"></div>

  </Page>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid'

const { reports, loadReports, filter_drug_id } = useReports()

loadReports()

watch(filter_drug_id, (newValue) => {
  loadReports()
})

const { data: drugs } = await useFetch('/api/drugs', {
  method: 'GET',
  headers: useRequestHeaders(['cookie'])
})
</script>

<style></style>
