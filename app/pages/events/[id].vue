<template>
  <Page>
    <Heading v-if="event">
      {{ event.name }}
      <template v-slot:subtitle>
        {{ eventDateFormatted }}
      </template>
    </Heading>
    <Heading v-else>
      event not found
      <template v-slot:subtitle>
        404
        <div class="h-20"></div>
      </template>
    </Heading>

    <div class="lg:w-95% xl:w-85% 2xl:w-75%">
      <div class="flex flex-col lg:flex-row mt-9 lg:mt-11" v-if="event">
        <div class="flex-1">
          <NuxtImg :src="event.avatar_url || undefined" class="rounded-lg md:w-full" width="700"
            v-if="event.avatar_url" />
          <PlaceholderPhoto v-else />
        </div>
        <div class="flex mt-9 lg:mt-0 lg:justify-end lg:pl-13 xl:pl-17">
          <VCalendar :attributes="calendarAttributes" :isDark="isDark" />
        </div>
      </div>

      <div class="mt-13 lg:mt-10 whitespace-pre-wrap font-medium" v-if="event">
        <MapPinIcon class="inline w-6 text-red-700 mr-2.5 -mt-1.3" />{{ event.location }}
      </div>

      <div class="mt-5 whitespace-pre-wrap font-medium" v-if="event">
        <CalendarIcon class="inline w-6 text-red-700 mr-2.5 -mt-1.3" />{{ eventDateFormatted }}
      </div>

      <div class="mt-9 whitespace-pre-wrap" v-if="event">
        {{ event.description }}
      </div>

      <div class="mt-14">
        <Button @click="goBack" class="!px-8">Zurück</Button>
      </div>

      <div class="h-60"></div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import { MapPinIcon } from '@heroicons/vue/24/solid'
import { CalendarIcon } from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

const { event, loadEvent, eventDate, eventDateFormatted } = useEvent()
const { isDark } = useApp()

const id = route.params.id

if (id) {
  await loadEvent(id as string)
}


const calendarAttributes = ref([
  {
    key: 'date',
    highlight: true,
    dates: eventDate,
  },
]);

const goBack = () => {
  router.back()
}
</script>