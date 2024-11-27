<template>
  <Page>
    <Heading>
      {{ $t('pages.chat.title') }}
      <template v-slot:subtitle>
        {{ $t('pages.chat.subtitle') }}
      </template>
    </Heading>
    <div class="flex flex-col lg:flex-row gap-x-5 mt-6 lg:mt-8">
      <div class="flex flex-col gap-y-.5 w-60 mt-9">
        <div class="font-bold text-lg mb-1">Chaträume</div>
        <NuxtLink :to="`/chat/rooms/${room.id}`" v-for="room in rooms" :key="room.id"
          class="px-3 py-1.5 hover:bg-[#f6f6f6] dark:hover:bg-[#0b0b19] cursor-pointer rounded-xl"
          activeClass="bg-[#f6f6f6] dark:bg-[#0a0a16] font-medium">
          {{ room.name }}</NuxtLink>
      </div>
      <div class="relative w-full">
        <NuxtPage class="w-full" />
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import type { Database } from '../../types/database.types'
type ChatRoom = Database['public']['Tables']['chatrooms']['Row']

const { data: rooms } = await useFetch<ChatRoom[]>(`/api/chat/rooms`, {
  method: 'GET',
  headers: useRequestHeaders(['cookie']),
})
</script>

<style></style>