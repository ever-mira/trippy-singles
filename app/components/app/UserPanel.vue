<template>
  <div class="p-2 mt-4 border-gray-200 border-1.5 dark:border-gray-800 rounded-xl bg-highlight dark:bg-highlight-dark">
    <NuxtLink :to="`/@${profile.username}`" @click="hideSidebar" v-if="profile">
      <div class="flex  gap-2.5">
        <div>
          <NuxtImg :src="profile.avatar_url" fit="cover" width="60" height="60" class="w-11 h-11 rounded-full"
            v-if="profile.avatar_url" />
          <img src="../../assets/avatar.jpg" class="w-14 rounded-full" v-else />
        </div>
        <div class="flex flex-col flex-grow pt-1">
          <div class="font-semibold leading-none">
            @{{ profile.username }}
          </div>
          <div class="text-gray-400 dark:text-gray-600 text-sm">
            eingeloggt.
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>


<script setup lang="ts">
const { profile } = useUser()
const { hideSidebar } = useApp()
</script>
