<template>
  <Page>
    <Heading>
      Nachricht
      <template v-slot:subtitle>
        Unterhaltung mit @{{ profile?.username }}
      </template>
    </Heading>

    <div class="!w-full xl:min-w-140 max-w-170 mt-9 border dark:border-gray-500 rounded-lg p-3">
      <div class="p-1 text-gray-500" v-if="!messages || messages.length < 1">Noch keine Nachrichten.</div>
      <div class="mt-19">
        <div v-for="message in messages" :key="message.id" class="w-full p-1">
          <div v-if="message.sender_id === user.id">
            <div class="flex justify-end">
              <div class="bg-gray-100 p-3 rounded-lg">
                {{ message.content }}
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex justify-start">
              <div class="bg-gray-100 p-3 rounded-lg">
                {{ message.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md:flex gap-x-2 mt-4">
        <Textarea type="text" placeholder="Nachricht" class="!w-full resize-none dark:bg-black dark:!border-0"
          @keydown.enter.prevent="sendMessage" v-model="message" />
        <Button class="self-start !px-7.5" @click="sendMessage">senden</Button>
      </div>
    </div>

    <div class="h-60"></div>
  </Page>
</template>

<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type Profile = Tables<'profiles'>
type Message = Tables<'messages'>

const route = useRoute()
const with_username = route.params.username
const user: Ref = useSupabaseUser()
const { showModal } = useModal()

const profile = ref<Profile | null>(null)
const messages = ref<Message[] | null>(null)

const message = ref<string>('')

await fetchProfile()
if (user.value) {
  await fetchMessages()
}

async function fetchProfile() {
  if (with_username) {
    const { data } = await useFetch<Profile>(`/api/users/${with_username}/profile`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie']),
    })

    if (data.value) {
      profile.value = data.value
    }
  }
}

async function fetchMessages() {
  if (profile.value && profile.value.user_id) {
    const { data } = await useFetch<Message[]>(`/api/conversations/${profile.value.user_id}`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie']),
    })

    if (data.value) {
      messages.value = data.value
    }
  }
}

const sendMessage = async () => {
  if (!user.value) {
    showModal('Du musst eingeloggt sein, um Nachrichten senden zu können.')
    return
  }
  if (message.value.length < 1) {
    return
  }
  const response = await $fetch(`/api/conversations/${profile.value?.user_id}`, {
    method: 'POST',
    body: { content: message.value },
  });
  message.value = ''
  fetchMessages()
}

</script>