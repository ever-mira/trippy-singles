<template>
  <div>
    <div class="mt-7 mb-2 text-gray-800 dark:text-gray-200">Umkreissuche:</div>
    <AutocompleteLocation v-model="selectedLocation" />
    <div class="grid grid-cols-1 -ml-5 mt-15 gap-x-.5 lg:gap-x-5 gap-y-2 xl:max-w-90% 2xl:max-w-80%" v-if="users">
      <div v-for="user in users" :key="user.user_id"
        class="ml-3 bg-red-50 hover:bg-red-100 dark:bg-gray-950 dark:hover:bg-gray-900 bg-opacity-40 hover:bg-opacity-40 py-1.5 pl-2 pr-5 rounded-xl">
        <NuxtLink :to="`/@${user.username}`" class="flex flex-row">
          <div class="flex flex-1">
            <NuxtImg :src="user.avatar_url" fit="cover" width="60" height="60"
              class="w-14 h-14 rounded-full shadow-mdsm" v-if="user.avatar_url" />
            <img src="../../assets/avatar.jpg" class="w-14 rounded-full" v-else />
            <div class="py-.5 px-3">
              <div>{{ user.username }}</div>
              <div class="text-sm text-gray-500">{{ user.location_label }}</div>
            </div>
          </div>
          <div class="flex flex-1 flex-col text-gray-800 dark:text-gray-200">
            <div v-if="user.distance || user.distance === 0" class="text-right">
              <div class="text-sm" v-if="user.distance === 0">0 km</div>
              <div class="text-sm" v-if="user.distance > 0 && user.distance < 10">{{ user.distance.toFixed(2) }} km
              </div>
              <div class="text-sm" v-if="user.distance > 10">{{ user.distance.toFixed(0) }} km</div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="h-80"></div>
  </div>
</template>

<script setup lang="ts">
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
</script>
