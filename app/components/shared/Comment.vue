<template>
  <div class="flex gap-x-3 mt-7">
    <Avatar :userName="comment.profiles.username" :avatarUrl="comment.profiles.avatar_url" class="w-12" />
    <div class="flex-1 grow">
      <div class="flex">
        <UsernameLink :userName="comment.profiles.username" />
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
