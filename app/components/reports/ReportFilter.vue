<template>
  <div class="flex flex-col md:flex-row gap-x-12 gap-y-7 mt-12 md:mt-11">
    <div class="grid grid-cols-1 md:grid-cols-[auto_auto] gap-y-2 md:gap-y-3 w-fit text-[1.13rem]">
      <div>Nach Droge filtern:</div>
      <select v-model="drugFilter"
        class="rounded-lg border border-gray-300 dark:border-gray-800 shadow-sm pl-2 pr-4 py-2 md:ml-4.5 text-sm bg-white dark:bg-black font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
        <option :value="null" selected>Alle</option>
        <option v-for="drug in drugs" :value="drug.id">{{ drug.name }}</option>
      </select>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-[auto_auto] gap-y-2 md:gap-y-3 w-fit text-[1.13rem]">
      <div>Langzeitberichte:</div>
      <select v-model="longTermFilter"
        class="rounded-lg border border-gray-300 dark:border-gray-800 shadow-sm pl-2 pr-4 py-2 md:ml-4.5 text-sm bg-white dark:bg-black font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
        <option value="with" selected>Auch</option>
        <option value="without">Ohne</option>
        <option value="only">Nur</option>
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
</script>

<style scoped></style>