<template>
  <Page>
    <Heading>
      {{ t('title') }}
      <template v-slot:subtitle>
        {{ t('subtitle') }}
      </template>
    </Heading>

    <div>
      <div class="mt-7 mb-2 text-gray-800 dark:text-gray-200">{{ t('search_near') }}</div>
      <AutocompleteLocation v-model="selectedLocation" class="w-full md:!w-90" />

      <UserGrid v-if="users">
        <UserTile v-for="user in users" :key="user.user_id" :user="user" />
      </UserGrid>

      <div class="h-80"></div>
    </div>

  </Page>
</template>

<script setup lang="ts">
import AutocompleteLocation from "~/components/location/AutocompleteLocation.vue"
import UserGrid from "~/components/user/UserGrid.vue"
import UserTile from "~/components/user/UserTile.vue"

const { users, loadUsers, updateUserList, selectedLocation } = useUsers()

if (!selectedLocation.value) {
  await loadUsers()
}

watch(selectedLocation, async (newLocation) => {
  if (newLocation) {
    let coordinates = newLocation.value?.geometry?.coordinates
    if (coordinates) {
      await updateUserList(coordinates)
    }
  }
})

const { t } = useI18n()
</script>

<i18n lang="json">{
  "de": {
    "title": "Menschen",
    "subtitle": "Profile und Visionen",
    "search_near": "Umkreissuche:"
  },
  "en": {
    "title": "Humans",
    "subtitle": "Profiles und Visions",
    "search_near": "Proximity Search:"
  }
}</i18n>

<style></style>
