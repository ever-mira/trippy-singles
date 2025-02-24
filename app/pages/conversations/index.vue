<template>
  <Page>
    <Heading>
      Postfach
      <template v-slot:subtitle>
        Dein Posteingang
      </template>
    </Heading>

    <div class="max-w-2xl mt-16">
      <div class="space-y-4">
        <div v-if="!conversations || conversations.length < 1" class="text-gray-700">Noch keine Nachrichten.</div>

        <ConversationTile v-for="conversation in conversations" :key="conversation.username"
          :conversation="conversation" v-else />

      </div>
    </div>

    <HintBox class="mt-19">
      Experiment: neue Menschen mit einem
      Zufalls-Satz
      anschreiben. In der Improvisation (Schreiben bevor man denken kann) liegt eine merkwürdige
      Magie.
    </HintBox>

  </Page>
</template>

<script setup lang="ts">
import ConversationTile
  from '~/components/conversation/ConversationTile.vue';
const { conversations, fetchConversations } = useConversations()

await fetchConversations()

</script>

<style></style>
