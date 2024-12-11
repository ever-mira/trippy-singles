<template>
  <Page>
    <Heading v-if="place">
      {{ place.name }}
      <template v-slot:subtitle>
        {{ place.description }}
      </template>
    </Heading>
    <Heading v-else>
      Place not found
      <template v-slot:subtitle>
        404
        <div class="h-20"></div>
      </template>
    </Heading>

    <div class="mt-9 lg:mt-11" v-if="place">
      <img :src="place.avatar_url || undefined" class="rounded-lg max-w-55 md:max-w-69 mt-10" v-if="place.avatar_url">
      <PlaceholderPhoto v-else />
    </div>

    <div class="mt-9">
      <Button @click="goBack" class="!px-8">Zurück</Button>
    </div>

    <div class="h-60"></div>
  </Page>
</template>

<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type Place = Tables<'places'>

import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const id = route.params.id

const place = ref<Place | null>(null)

if (id) {
  const { data } = await useFetch<Place>(`/api/places/${id}`, {
    method: 'GET',
    headers: useRequestHeaders(['cookie']),
  })

  if (data.value) {
    place.value = data.value
  }
}

const goBack = () => {
  router.back()
}

</script>