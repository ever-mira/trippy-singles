<template>
  <div
    class="ml-3 bg-blue-50 hover:bg-blue-100 dark:border-gray-900 dark:bg-gray-950 dark:hover:bg-gray-900 bg-opacity-40 hover:bg-opacity-40 py-1.7 pl-2 pr-5 rounded-xl">
    <NuxtLink :to="`/@${user.username}`" class="flex flex-row">
      <div class="flex">
        <NuxtImg :src="user.avatar_url" fit="cover" width="60" height="60" class="w-15 h-15 rounded-full shadow-mdsm"
          v-if="user.avatar_url" />
        <img src="../../assets/avatar.jpg" class="w-15 rounded-full" v-else />
        <div class="py-.5 px-3">
          <div>{{ user.username }}</div>
          <div class="text-sm text-gray-500">{{ user.location_label }}</div>
        </div>
      </div>
      <div class="flex flex-1 flex-col text-gray-800 dark:text-gray-200">
        <div v-if="user.distance || user.distance === 0" class="text-right">
          <div class="text-sm" v-if="user.distance === 0">0 km</div>
          <div class="text-sm" v-if="user.distance > 0 && user.distance < 10">
            {{ user.distance.toFixed(1) }} km
          </div>
          <div class="text-sm" v-if="user.distance > 10">{{ user.distance.toFixed(0) }} km</div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type Profile = Tables<"profiles">
import type { ProfileWithDistance } from "~~/types/extended.types"

defineProps<{ user: Profile | ProfileWithDistance }>()
</script>

<style scoped></style>
