<template>
  <Page>
    <Heading>
      {{ t('title') }}
      <template v-slot:subtitle>
        {{ t('subtitle') }}
      </template>
    </Heading>
    <div class="flex flex-col lg:flex-row gap-x-5 mt-6 lg:mt-8">

      <ChatRoomList class="mt-6 lg:mt-8" />

      <div class="relative w-full">
        <NuxtPage class="w-full" />
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import ChatRoomList from '~/components/chat/ChatRoomList.vue';
const { t } = useI18n()
</script>

<i18n lang="json">{
  "de": {
    "title": "Chat",
    "subtitle": "Chat Räume"
  },
  "en": {
    "title": "Chat",
    "subtitle": "Chat Rooms"
  }
}</i18n>

<style></style>