<template>
  <div class="flex gap-x-3 mt-7">
    <NuxtLink :to="`/@${comment.profiles.username}`" class="mt-auto">
      <NuxtImg :src="comment.profiles.avatar_url || ''" class="w-12 rounded-full" height="70" width="70" fit="cover"
        v-if="comment.profiles.avatar_url" />
      <PlaceholderAvatar v-else />
    </NuxtLink>
    <div class="flex-1 grow">
      <div class="flex">
        <NuxtLink :to="`/@${comment.profiles.username}`" class="text-blue-600 hover:text-blue-500">
          {{ comment.profiles.username }}
        </NuxtLink>
        <span class="text-gray-700 ml-2">{{ formatDate(comment.created_at) }}</span>
      </div>
      <div class="mt-1">{{ comment.text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatRelative, parseISO } from "date-fns"
import { de } from "date-fns/locale"

defineProps<{ comment: any }>()

function formatDate(dateString: string) {
  let formattedDate: string = formatRelative(parseISO(dateString), new Date(), { locale: de })
  return formattedDate
}
</script>

<style scoped></style>
