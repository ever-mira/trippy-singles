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
        <div class="font-bold text-lg mb-1">{{ $t('pages.chat.chat_rooms') }}</div>
        <NuxtLink :to="`/chat/rooms/${room.id}`" v-for="room in rooms" :key="room.id"
          class="px-3 py-1.5 hover:bg-highlight dark:hover:bg-highlight-dark cursor-pointer rounded-xl"
          activeClass="bg-highlight dark:bg-highlight-dark font-medium">
          {{ room.name }}</NuxtLink>
      </div>
      <div class="relative w-full">
        <NuxtPage class="w-full" />
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type ChatRoom = Tables<'chatrooms'>

const { data: rooms } = await useFetch<ChatRoom[]>(`/api/chat/rooms`, {
  method: 'GET',
  headers: useRequestHeaders(['cookie']),
})
</script>

<style></style>