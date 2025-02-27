<template>
  <div>
    <div class="mt-12 relative text-3xl font-bold text-heading">{{ $t('signup.logged_in') }}</div>
    <div class="mt-9 relative">
      <span v-if="!unreadConversationCount">Du hast keine neuen Nachrichten.</span>
      <span v-else>Du hast {{ unreadConversationCount }} neue Nachrichten.</span>
    </div>

    <div class="mt-9">
      <Button to="/conversations" class="!px-6">{{ $t('signup.mailbox') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchUnreadConversationCount, unreadConversationCount } = useConversations()
await fetchUnreadConversationCount()
</script>
