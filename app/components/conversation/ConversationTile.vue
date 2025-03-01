<template>
  <NuxtLink :to="`/conversations/@${conversation.username}`"
    class="flex flex-row bg-white rounded-lg border dark:border-gray-800 hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-950 cursor-pointer">
    <div class="h-auto w-2.1 rounded-l-lg flex-shrink-0"
      :class="{ '!bg-indigo-200': !conversation.last_message?.read }">
    </div>
    <div class="h-auto flex items-center p-2 flex-shrink-0">
      <NuxtLink :to="`/@${conversation.username}`" class="my-auto">
        <NuxtImg :src="conversation.avatar_url || ''" class="w-15 rounded-full" height="70" width="70" fit="cover"
          v-if="conversation.avatar_url" />
        <PlaceholderAvatar v-else />
      </NuxtLink>
    </div>
    <div class="flex grow justify-between items-center p-4 min-w-0">
      <div class="min-w-0 overflow-hidden">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {{ conversation.username }}
        </h2>
        <p class="inline text-sm text-gray-500 truncate min-w-0 w-full mr-3">
          {{ conversation.last_message?.content }}
        </p>
      </div>
      <div class="text-sm text-gray-400 flex-shrink-0">
        {{ formatDate(conversation.last_message?.created_at) }}
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Database } from "~~/types/database.types"
type ConversationItem = Database["public"]["Functions"]["get_conversations"]["Returns"][number]

defineProps<{ conversation: ConversationItem }>()

const formatDate = (isoDate: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(isoDate).toLocaleDateString(undefined, options)
}
</script>

<style scoped></style>