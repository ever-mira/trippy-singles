<template>
  <div>
    <h1 class="text-gray-500 dark:text-gray-500 text-xl">
      <UsersIcon class="inline w-6 text-blue-400 dark:text-blue-600 -mt-1.4 mr-3" />Trippies
    </h1>
    <div class="flex flex-wrap -ml-3 mt-4 gap-x-.5 lg:gap-x-0 gap-y-3 xl:max-w-90% 2xl:max-w-80%" v-if="users">
      <div v-for="user in users" :key="user.user_id" class="ml-3">
        <NuxtLink :to="`/@${user.username}`" class="">
          <NuxtImg :src="user.avatar_url" fit="cover" width="60" height="60"
            class="w-15 h-15 lg:w-14 lg:h-14 rounded-full shadow-mdsm hover:scale-97 border-white dark:border-black"
            v-if="user.avatar_url" />
          <img src="../../assets/avatar.jpg" class="w-13.5 rounded-full hover:border-1 border-white dark:border-black"
            v-else />
        </NuxtLink>
      </div>
    </div>
    <!-- <NuxtLink to="/people" class="block text-blue-700 hover:text-blue-600 text-lg mt-3">Alle User →
    </NuxtLink> -->
  </div>
</template>

<script setup lang="ts">
import { UsersIcon } from '@heroicons/vue/24/solid'
const { users, loadUsers } = useUsers()
await loadUsers()
</script>
