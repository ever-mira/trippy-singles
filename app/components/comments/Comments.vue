<template>
  <div>
    <div class="mb-8">
      <span class="text-xl">
        <slot>{{ t('comments') }}</slot>
      </span>&nbsp;
      <span class="text-gray-800 dark:text-gray-200 text-sm">
        <slot name="hint"></slot>
      </span>
    </div>

    <p class="text-gray-700 mt-3" v-if="comments?.length === 0">{{ t('no_comments_yet') }}</p>

    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" :category="props.category"
      class="flex gap-x-3 mb-5 mt-7" @deleteClicked="onDeleteClicked" @respondClicked="onRespondClicked(comment)" />

    <div class="mt-11">
      <span v-if="respondComment">
        <span class="text-lg">{{ t('answer_to') }}</span> <span class="text-md"> {{
          respondComment.profiles.username
        }}</span>
        <XMarkIcon class="inline w-4.4 -mt.4 text-gray-800 ml-2 cursor-pointer" @click="cancelRespondClicked" />
      </span>
      <span class="text-lg" v-else>{{ t('add_comment') }}</span>

      <div class="flex items-end gap-x-2">
        <Textarea class="w-full mt-1.6 h-17" v-model="newComment" maxlength="500"></Textarea>
        <Button class="!px-5 mt-1.8 h-fit" color="indigo_dark" @click="saveCommentClicked">
          <PaperAirplaneIcon class="inline w-5.5 text-white -mt.5" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid"
import { XMarkIcon } from "@heroicons/vue/24/outline"
import Comment from "~~/app/components/comments/Comment.vue"
import type { ExtendedComment } from "~~/types/extended.types"


interface Props {
  category: 'reports' | 'hints'
  resourceId: string
}

const props = defineProps<Props>()

const { comments, newComment, saveComment, deleteComment } = await useComments(props.category, props.resourceId)

const { showModal } = useModal()

const onDeleteClicked = (commentId: number) => {
  showModal(t('really_delete_comment'), true, () => yesDeleteClicked(commentId))
}

const respondComment = ref<ExtendedComment | null>(null)

const onRespondClicked = (comment: ExtendedComment) => {
  respondComment.value = comment
}

const cancelRespondClicked = () => {
  respondComment.value = null
}

const saveCommentClicked = async () => {
  if (respondComment.value) {
    await saveComment(respondComment.value.id)
    respondComment.value = null
  } else {
    saveComment()
  }
}

const yesDeleteClicked = (commentId: number) => {
  deleteComment(commentId)
}

const { t } = useI18n()
</script>

<style scoped></style>


<i18n lang="json">{
  "de": {
    "comments": "Kommentare",
    "no_comments_yet": "noch keine",
    "add_comment": "Kommentar hinzufügen",
    "really_delete_comment": "Kommentar wirklich löschen?",
    "answer_to": "Antwort an:"
  },
  "en": {
    "comments": "Comments",
    "no_comments_yet": "no comments yet",
    "add_comment": "Add Comment",
    "really_delete_comment": "Really delete comment?",
    "answer_to": "Answer to:"
  }
}</i18n>