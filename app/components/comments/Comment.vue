<template>
  <div class="flex gap-x-3">
    <Avatar :userName="comment.profiles.username" :avatarUrl="comment.profiles.avatar_url" class="w-11.5" :class="{ '!w-10.5': props.reply }"/>
    <div class="flex-1 grow">
      <div class="flex flex-col md:flex-row">
        <UsernameLink :userName="comment.profiles.username" />
        <div class="flex items-center">
          <span class="text-gray-700 dark:text-gray-400 ml-0 md:ml-2 text-sm">{{ formatDate(comment.created_at) }}</span>
          <CommentMenu :comment="comment" :category="category" @deleteClicked="emit('deleteClicked', comment.id)" />
          <ArrowUturnLeftIcon class="w-4.1 mt.1 ml-2 text-gray-600 cursor-pointer" @click="emit('respondClicked')" v-if="!props.reply"/>
          <CommentLikes :comment="comment" :category="category" />
        </div>
      </div>
      <div class="mt-1.5 md:mt-1">{{ comment.text }}</div>
      <div class="-ml-5 mt-4.5" v-if="comment.replies">
        <Comment v-for="comment in comment.replies" :key="comment.id" :comment="comment" :category="props.category" :reply="true" @deleteClicked="emit('deleteClicked', comment.id)"
      class="flex gap-x-3 mt-4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDistance, parseISO } from "date-fns"
import { de } from "date-fns/locale"
import CommentLikes from "./CommentLikes.vue";
import CommentMenu from "./CommentMenu.vue";
import { ArrowUturnLeftIcon } from "@heroicons/vue/24/solid";

const props = defineProps<{ comment: any, category: 'reports' | 'hints', reply?: boolean }>()
const emit = defineEmits(['deleteClicked', 'respondClicked'])

function formatDate(dateString: string) {
  let formattedDate: string = formatDistance(parseISO(dateString), new Date(), { locale: de, addSuffix: true })
  return formattedDate
}

const { showModal } = useModal()

</script>

<style scoped></style>
