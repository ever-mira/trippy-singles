<template>
    <div class="flex flex-col md:flex-row mt-12 md:mt-11">
      <div class="md:w-auto mb-2 text-[1.13rem] leading-8 text-gray-800 dark:text-gray-200">Nach Droge filtern:
      </div>
      <select v-model="filter_drug_id"
        class="rounded-lg border border-gray-300 dark:border-gray-800 shadow-sm pl-2 pr-4 py-2 md:ml-4.5 text-sm bg-white dark:bg-black font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-950 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
        <option :value="null" selected>Alle</option>
        <option v-for="drug in drugs" :value="drug.id">{{ drug.name }}</option>
      </select>
    </div>
</template>

<script setup lang="ts">
const { filter_drug_id } = useReports()

const { data: drugs } = await useFetch('/api/drugs', {
  method: 'GET',
  headers: useRequestHeaders(['cookie'])
})
</script>

<style scoped></style>