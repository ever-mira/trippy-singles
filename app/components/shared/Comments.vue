<template>
  <div>
    <span class="text-xl">
      <slot>{{ t('comments') }}</slot>
    </span>&nbsp;
    <span class="text-gray-800 dark:text-gray-200 text-sm">
      <slot name="hint"></slot>
    </span>

    <p class="text-gray-700 mt-3" v-if="comments?.length === 0">{{ t('no_comments_yet') }}</p>

    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" class="flex gap-x-3 mb-9" />

    <div class="mt-10">
      <span class="text-lg">{{ t('add_comment') }}</span>&nbsp;
      <div class="flex items-end gap-x-2">
        <Textarea class="w-full mt-1.6 h-17" v-model="newComment" maxlength="500"></Textarea>
        <Button class="!px-5 mt-1.8 h-fit" color="indigo_dark" @click="saveComment">
          <PaperAirplaneIcon class="inline w-5.5 text-white -mt.5" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid"
import Comment from "~~/app/components/shared/Comment.vue"

interface Props {
  category: 'reports' | 'hints'
  resourceId: string
}

const props = defineProps<Props>()

const { comments, newComment, saveComment } = await useComments(props.category, props.resourceId)

const { t } = useI18n()
</script>

<style scoped></style>


<i18n lang="json">{
  "de": {
    "comments": "Kommentare",
    "no_comments_yet": "noch keine.",
    "add_comment": "Kommentar hinzufügen"
  },
  "en": {
    "comments": "Comments",
    "no_comments_yet": "no comments yet",
    "add_comment": "Add Comment"
  }
}</i18n>