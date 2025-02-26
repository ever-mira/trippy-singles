<template>
  <div
    class="inline-flex h-4.8 w-4.8 ml-2 items-center justify-center rounded-full bg-blue-600 text-white text-sm leading-none"
    v-if="unreadConversationCount">
    <div class="ml.23 -mt.6 font-normal">{{ unreadConversationCount }}</div>
  </div>
</template>


<script setup lang="ts">
const { unreadConversationCount, fetchUnreadConversationCount } = useConversations()
await fetchUnreadConversationCount()
</script>