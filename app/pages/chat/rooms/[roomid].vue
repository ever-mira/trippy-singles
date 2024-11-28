<template>
  <div class="bg-highlight dark:bg-highlight-dark p-1.5 rounded-xl mt-7 lg:mt-0 mb-17" v-if="room">
    <div class="p-3 bg-white dark:bg-black rounded-xl min-h-100">
      <div class="" v-for="message in messages" v-if="messages">
        {{ message.content }}
      </div>
      <div class="text-gray-600" v-if="messages && messages.length === 0">
        Noch keine Nachrichten in diesem Chat
      </div>
    </div>
    <div class="flex gap-x-2 mt-3">
      <Textarea type="text" placeholder="Nachricht" v-model="inputText"
        class="!w-full resize-none dark:bg-black dark:!border-0" @keydown.enter="sendMessage" />
      <Button class="self-start !px-7.5" @click="sendMessage">Senden</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type Chatroom = Tables<'chatrooms'>
type Chatmessage = Tables<'chatmessages'>

definePageMeta({
  pageTransition: {
    name: 'chat',
    mode: 'out-in',
  }
})

const route = useRoute()
const roomid = route.params.roomid

const room = ref<Chatroom>()
const messages = ref<Chatmessage[]>([])

const [roomResponse, messagesResponse] = await Promise.all([
  useFetch<Chatroom>(`/api/chat/rooms/${roomid}`, {
    method: 'GET',
    headers: useRequestHeaders(['cookie']),
  }),
  useFetch<Chatmessage[]>(`/api/chat/rooms/${roomid}/messages`, {
    method: 'GET',
    headers: useRequestHeaders(['cookie']),
  }),
])

if (roomResponse.data.value) {
  room.value = roomResponse.data.value
}

if (messagesResponse.data.value) {
  messages.value = messagesResponse.data.value
}

const inputText = ref('')

const sendMessage = async () => {
  if (!inputText.value) return

  await $fetch(`/api/chat/rooms/${roomid}/messages`, {
    method: 'POST',
    body: JSON.stringify({ content: inputText.value }),
    headers: useRequestHeaders(['cookie']),
  })

  inputText.value = ''
}

const supabase = useSupabaseClient()

const channel = supabase
  .channel(`messages_chatroom_${roomid}`)
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'chatmessages',
    filter: `chatroom_id=eq.${roomid}`,
  }, (payload) => {
    if (messages.value)
      messages.value.push(payload.new as Chatmessage)
  })
  .subscribe()

onUnmounted(() => {
  supabase.removeChannel(channel)
})
</script>

<style>
.chat-enter-active,
.chat-leave-active {
  transition: opacity 0s ease;
}

.chat-enter-from {
  opacity: 1;
}

.chat-leave-to {
  opacity: 1;
}
</style>