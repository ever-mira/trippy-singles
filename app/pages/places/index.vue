<template>
  <Page>

    <div class="flex flex-col lg:flex-row w-full">
      <div class="flex-1">
        <Heading>
          {{ $t('pages.places.title') }}
          <template v-slot:subtitle>
            {{ $t('pages.places.subtitle') }}
          </template>
        </Heading>
      </div>

      <div class="flex-1">
        <div class="mt-11 lg:mt-4">
          <Button color="indigo" to="/places/create" class="!px-5">
            <PlusIcon class="inline w-4.5 mr-2 -mt.5" />Ort eintragen
          </Button>
        </div>
      </div>

      <div class="flex-1">
      </div>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 -ml-5 mt-15 gap-x-.5 lg:gap-x-5 gap-y-5 lg: gap-y-4 xl:max-w-90% 2xl:max-w-75%"
      v-if="places">

      <NuxtLink :to="`/places/${place.id}`"
        class="block ml-3 bg-red-50 hover:bg-red-100 dark:bg-gray-950 dark:hover:bg-gray-900 bg-opacity-40 hover:bg-opacity-40 py-3 pl-2 pr-5 rounded-xl"
        v-for="place in places" :key="place.id">

        <div class="flex">
          <NuxtImg :src="place.avatar_url || ''" class="w-15 rounded-full" height="70" width="70" fit="cover"
            v-if="place.avatar_url" />
          <PlaceholderPhotoSmall v-else />
          <div class="py-.5 px-3">
            <div>{{ place.name }}</div>
            <div class="text-sm text-gray-500">{{ place.description }}</div>
          </div>
        </div>

      </NuxtLink>

    </div>
    <div class="h-80"></div>

  </Page>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid'

const { data: places } = await useFetch(`/api/places/`, {
  method: 'GET',
  headers: useRequestHeaders(['cookie']),
})
</script>

<style></style>
