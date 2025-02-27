<template>
  <div>
    <span class="text-xl">
      <slot>Kommentare</slot>
    </span>&nbsp;
    <span class="text-gray-800 dark:text-gray-200 text-sm">
      <slot name="hint"></slot>
    </span>

    <p class="text-gray-700 mt-3" v-if="comments?.length === 0">noch keine.</p>

    <Comment v-for="comment in comments" :key="comment.id" :comment="comment" class="flex gap-x-3 mt-7 mb-9" />

    <div class="mt-10">
      <span class="text-lg">Kommentar hinzufügen</span>&nbsp;
      <Textarea class="w-full mt-1.6 h-17" v-model="newComment"></Textarea>
      <Button class="!px-5 mt-1.8" @click="saveComment">Abschicken</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Comment from "~~/app/components/shared/Comment.vue"

interface Props {
  category: 'reports' | 'hints'
  resourceId: string
}

const props = defineProps<Props>()

const { comments, newComment, saveComment } = await useComments(props.category, props.resourceId)

</script>

<style scoped></style>
