<template>
  <div class="flex flex-col gap-y-.5 w-60 p-1 rounded-xl">
    <div class="font-bold text-lg mb-1">{{ $t('pages.chat.chat_rooms') }}</div>

    <NuxtLink :to="`/chat/rooms/${room.slug}`" v-for="room in rooms" :key="room.id"
      class="px-3 py-1.5 hover:bg-highlight dark:hover:bg-highlight-dark cursor-pointer rounded-lg"
      activeClass="bg-highlight dark:bg-highlight-dark font-semibold">
      {{ room.name }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type ChatRoom = Tables<'chatrooms'>

const { data: rooms } = await useFetch<ChatRoom[]>(`/api/chat/rooms`, {
  method: 'GET',
  headers: useRequestHeaders(['cookie']),
})
const route = useRoute()

if (rooms.value && rooms.value?.length > 0 && route.path.split('/').length < 4) {
  let firstRoom = rooms.value[0]
  const router = useRouter()
  router.push(`/chat/rooms/${firstRoom?.slug}`)
}

</script>

<style></style>