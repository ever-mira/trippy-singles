<template>
  <div>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -ml-5 mt-15 gap-x-.5 lg:gap-x-5 gap-y-2 xl:max-w-90% 2xl:max-w-80%"
      v-if="users">
      <div v-for="user in users" :key="user.user_id"
        class="ml-3 hover:bg-gray-50 dark:hover:bg-gray-950 py-1.5 pl-2 pr-5 rounded-xl">
        <NuxtLink :to="`/@${user.username}`">
          <div class="flex">
            <NuxtImg :src="user.avatar_url" width="60" height="60" class="w-15 rounded-full" v-if="user.avatar_url" />
            <img src="../../assets/avatar.jpg" class="w-15 rounded-full" v-else />
            <div class="py-.5 px-3">
              <div>{{ user.displayname }}</div>
              <div class="text-sm text-gray-300">@{{ user.username }}</div>
            </div>
          </div>
        </NuxtLink>

      </div>
    </div>
    <div class="h-80"></div>
  </div>
</template>


<script setup lang="ts">
import { AvatarImage, AvatarRoot } from 'radix-vue'
import type { Tables } from "~~/types/database.types"
type ProfileData = Tables<'profiles'>

const { data: users } = await useFetch<ProfileData[]>(`/api/users/`, {
  method: 'GET',
  headers: useRequestHeaders(['cookie']),
})

</script>
