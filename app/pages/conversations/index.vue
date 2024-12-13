<template>
  <Page>
    <Heading>
      Postfach
      <template v-slot:subtitle>
        Dein Posteingang
      </template>
    </Heading>

    <div class="max-w-3xl mt-14">
      <div class="space-y-4">
        <div v-if="!conversations || conversations.length < 1" class="text-gray-700">Noch keine Nachrichten.</div>
        <NuxtLink :to="`/conversations/@${conversation.username}`" v-for="conversation in conversations"
          :key="conversation.username"
          class="flex justify-between items-center p-4 bg-white rounded-lg border dark:border-gray-800 hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-950 cursor-pointer">
          <div>
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {{ conversation.username }}
            </h2>
            <p class="text-sm text-gray-500 truncate max-w-md">
              {{ conversation.last_message.content }}
            </p>
          </div>
          <div class="text-sm text-gray-400">
            {{ formatDate(conversation.last_message.created_at) }}
          </div>
        </NuxtLink>
      </div>
    </div>

  </Page>
</template>

<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type Message = Tables<'messages'>

const conversations = ref(null)

await fetchConversations()

async function fetchConversations() {
  const { data } = await useFetch(`/api/conversations/`, {
    method: 'GET',
    headers: useRequestHeaders(['cookie']),
  })

  if (data.value) {
    conversations.value = data.value
  }
}

const formatDate = (isoDate) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(isoDate).toLocaleDateString(undefined, options)
}

</script>

<style></style>
