<template>
  <div>
    <div class="mt-12 relative text-3xl font-bold text-heading">{{ t("title") }}</div>
    <div class="mt-9 relative">
      <span v-if="!unreadConversationCount">{{ t("no_new_messages") }}</span>
      <span v-else>{{ t("you_have") }} {{ unreadConversationCount }} {{ t("new_messages") }}</span>
    </div>

    <div class="mt-9">
      <Button to="/conversations" class="!px-6">{{ t('mailbox') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchUnreadConversationCount, unreadConversationCount } = useConversations()
await fetchUnreadConversationCount()

const { t } = useI18n()
</script>

<i18n lang="json">{
  "de": {
    "title": "Hallo.",
    "no_new_messages": "Du hast keine neuen Nachrichten.",
    "you_have": "Du hast",
    "new_messages": "neue Nachrichten.",
    "mailbox": "Posteingang"
  },
  "en": {
    "title": "Hello.",
    "no_new_messages": "You have no new messages.",
    "you_have": "You have",
    "new_messages": "new messages.",
    "mailbox": "Inbox"
  }
}</i18n>