<template>
  <div class="flex flex-col md:flex-row gap-x-12 gap-y-7 mt-12 md:mt-11">
    <div class="grid grid-cols-1 md:grid-cols-[auto_auto] gap-y-2 md:gap-y-3 w-fit text-[1.13rem]">
      <div>{{ t("fiter_by_drug") }}</div>
      <select v-model="drugFilter"
        class="block rounded-lg border border-gray-300 dark:border-gray-800 shadow-sm pl-2 pr-4 py-2 md:ml-4.5 text-sm bg-white dark:bg-black font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
        <option :value="null" selected>{{ t("all") }}</option>
        <option v-for="drug in drugs" :value="drug.id">{{ drug.name }}</option>
      </select>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-[auto_auto] gap-y-2 md:gap-y-3 w-fit text-[1.13rem]">
      <div>{{ t("long_term_reports") }}</div>
      <select v-model="longTermFilter"
        class="rounded-lg border border-gray-300 dark:border-gray-800 shadow-sm pl-2 pr-4 py-2 md:ml-4.5 text-sm bg-white dark:bg-black font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
        <option value="with" selected>{{ t("with") }}</option>
        <option value="without">{{ t("without") }}</option>
        <option value="only">{{ t("only") }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
const { drugFilter, longTermFilter } = useReports()

const { data: drugs } = await useFetch('/api/drugs', {
  method: 'GET',
  headers: useRequestHeaders(['cookie'])
})

const { t } = useI18n()
</script>

<style scoped></style>

<i18n lang="json">{
  "de": {
    "fiter_by_drug": "Nach Droge filtern:",
    "all": "Alle",
    "long_term_reports": "Langzeitberichte:",
    "with": "Auch",
    "without": "Ohne",
    "only": "Nur"
  },
  "en": {
    "fiter_by_drug": "Filter by Drug:",
    "all": "All",
    "long_term_reports": "Long Term Reports:",
    "with": "Show",
    "without": "Hide",
    "only": "Only"
  }
}</i18n>