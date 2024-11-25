<template>
  <div>
    <h1 class="text-gray-300 text-xl">{{ $t('app.new_users') }}</h1>
    <div class="flex flex-wrap -ml-3 mt-7 gap-y-3">
      <div v-for="user in users" :key="user.id" class="ml-3">
        <NuxtLink :to="`/@${user.username}`">
          <AvatarRoot>
            <AvatarImage :src="user.avatar_url" class="w-14 rounded-full" />
            <AvatarFallback>
              <img src="../../assets/avatar.jpg" class="w-14 rounded-full" />
            </AvatarFallback>
          </AvatarRoot>
        </NuxtLink>
      </div>
    </div>
    <div class="h-80"></div>
  </div>
</template>


<script setup lang="ts">
import { AvatarImage, AvatarRoot } from 'radix-vue'
import type { Database } from '../../../types/database.types'
type ProfileData = Database['public']['Tables']['profiles']['Row']

const { data: users } = await useFetch<ProfileData>(`/api/users/`, {
  method: 'GET',
  headers: useRequestHeaders(['cookie']),
})

</script>
