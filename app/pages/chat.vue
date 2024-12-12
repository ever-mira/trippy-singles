<template>
  <Page>
    <Heading>
      {{ $t('pages.chat.title') }}
      <template v-slot:subtitle>
        {{ $t('pages.chat.subtitle') }}
      </template>
    </Heading>
    <div class="flex flex-col lg:flex-row gap-x-5 mt-6 lg:mt-8">

      <ChatRoomList />

      <div class="relative w-full">
        <NuxtPage class="w-full" />
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
import ChatRoomList from '~/components/chat/ChatRoomList.vue';
</script>

<style></style>