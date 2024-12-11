<template>
  <Page>
    <div class="flex flex-col lg:flex-row w-full">
      <div class="flex-1">
        <Heading>
          {{ $t('pages.events.title') }}
          <template v-slot:subtitle>
            {{ $t('pages.events.subtitle') }}
          </template>
        </Heading>
      </div>

      <div class="flex-1">
        <div class="mt-11 lg:mt-4">
          <Button color="indigo" to="/events/create" class="!px-5">
            <PlusIcon class="inline w-4.5 mr-2 -mt.5" />Veranstaltung erstellen
          </Button>
        </div>
      </div>

      <div class="flex-1">
      </div>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 -ml-5 mt-15 gap-x-.5 lg:gap-x-5 gap-y-2 xl:max-w-90% 2xl:max-w-80%"
      v-if="events">

      <NuxtLink :to="`events/${event.id}`"
        class="block ml-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 border border-gray-200 dark:border-gray-800 py-3 pl-2 pr-5 rounded-xl"
        v-for="event in events" :key="event.id">

        <div class="flex">
          <img :src="event.avatar_url || ''" class="w-15 rounded-full" v-if="event.avatar_url" />
          <PlaceholderPhotoSmall v-else />

          <div class="py-.5 px-3">
            <div>{{ event.name }}</div>
            <div class="text-sm text-gray-500">{{ formatDate(event.date) }}</div>
          </div>
        </div>

      </NuxtLink>

    </div>
    <div class="h-80"></div>

  </Page>
</template>

<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type Event = Tables<"events">
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { PlusIcon } from '@heroicons/vue/24/solid'

const { data: events } = await useFetch<Event[]>(`/api/events/`, {
  method: 'GET',
  headers: useRequestHeaders(['cookie']),
})

const formatDate = (date: string) => {
  if (date) {
    return format(new Date(date), "EEEE, d. MMMM yyyy, HH:mm", { locale: de })
  }
}
</script>

<style></style>
