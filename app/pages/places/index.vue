<template>
  <Page>
    <Heading>
      {{ $t('pages.places.title') }}
      <template v-slot:subtitle>
        {{ $t('pages.places.subtitle') }}
      </template>
    </Heading>

    <div class="mt-11">
      <Button color="indigo" to="/places/create" class="!px-5">
        Ort erstellen
      </Button>
    </div>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -ml-5 mt-15 gap-x-.5 lg:gap-x-5 gap-y-2 xl:max-w-90% 2xl:max-w-80%"
      v-if="places">
      <div v-for="place in places" :key="place.id"
        class="ml-3 hover:bg-gray-50 dark:hover:bg-gray-950 py-1.5 pl-2 pr-5 rounded-xl">
        <NuxtLink :to="`places/${place.id}`">
          <div class="flex">
            <AvatarRoot>
              <AvatarImage :src="place.avatar_url || ''" class="w-15 rounded-full" />
              <AvatarFallback>
                <img src="../../assets/place_holder.svg" class="w-15 rounded-full" />
              </AvatarFallback>
            </AvatarRoot>
            <div class="py-.5 px-3">
              <div>{{ place.name }}</div>
              <div class="text-sm text-gray-300">{{ place.description }}</div>
            </div>
          </div>
        </NuxtLink>

      </div>
    </div>
    <div class="h-80"></div>

  </Page>
</template>

<script setup lang="ts">
const { data: places } = await useFetch(`/api/places/`, {
  method: 'GET',
  headers: useRequestHeaders(['cookie']),
})
</script>

<style></style>
