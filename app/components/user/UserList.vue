<template>
  <div>
    <h1 class="text-gray-300 dark:text-gray-700 text-xl">{{ $t('app.new_users') }}</h1>
    <div class="flex flex-wrap -ml-3 mt-7 gap-x-.5 lg:gap-x-0 gap-y-3 xl:max-w-90% 2xl:max-w-80%" v-if="users">
      <div v-for="user in users" :key="user.user_id" class="ml-3">
        <NuxtLink :to="`/@${user.username}`">
          <NuxtImg :src="user.avatar_url" width="60" height="60" class="w-13.5 rounded-full" v-if="user.avatar_url" />
          <img src="../../assets/avatar.jpg" class="w-13.5 rounded-full" v-else />
        </NuxtLink>
      </div>
    </div>
    <div class="h-80"></div>
  </div>
</template>


<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type ProfileData = Tables<'profiles'>

const { data: users } = await useFetch<ProfileData[]>(`/api/users/`, {
  method: 'GET',
  headers: useRequestHeaders(['cookie']),
})

</script>
