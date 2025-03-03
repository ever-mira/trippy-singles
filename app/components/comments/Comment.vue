<template>
  <div class="flex gap-x-3 mt-7">
    <Avatar :userName="comment.profiles.username" :avatarUrl="comment.profiles.avatar_url" class="w-12" />
    <div class="flex-1 grow">
      <div class="flex flex-col md:flex-row">
        <UsernameLink :userName="comment.profiles.username" />
        <div class="flex items-center">
          <span class="text-gray-700 dark:text-gray-400 ml-0 md:ml-2">{{ formatDate(comment.created_at) }}</span>
          <CommentMenu :comment="comment" :category="category" @deleteClicked="emit('deleteClicked')" />
          <CommentLikes :comment="comment" :category="category" />
        </div>
      </div>
      <div class="mt-1.5 md:mt-1">{{ comment.text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDistance, parseISO } from "date-fns"
import { de } from "date-fns/locale"
import CommentLikes from "./CommentLikes.vue";
import CommentMenu from "./CommentMenu.vue";

const props = defineProps<{ comment: any, category: 'reports' | 'hints' }>()
const emit = defineEmits(['deleteClicked'])

function formatDate(dateString: string) {
  let formattedDate: string = formatDistance(parseISO(dateString), new Date(), { locale: de, addSuffix: true })
  return formattedDate
}

</script>

<style scoped></style>
