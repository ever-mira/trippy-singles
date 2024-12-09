<template>
  <div class="bg-highlight dark:bg-highlight-dark p-1.5 rounded-md mt-7 lg:mt-0 mb-17">
    <div class="p-3 bg-white dark:bg-black rounded-xl min-h-100">
      <div class="text-gray-600" v-if="!connected">
        Connecting...
      </div>
      <div class="text-gray-600" v-if="error">
        Fehler beim Herstellen der Verbindung
      </div>
      <div class="" v-for="message in messages" v-if="messages">
        <span class="font-medium">{{ message.user.username }}:</span> {{ message.content }}
      </div>
      <div class="text-gray-600" v-if="connected && messages && messages.length === 0">
        {{ $t('pages.chat.no_messages_yet') }}
      </div>
    </div>
    <div class="flex gap-x-2 mt-3">
      <Textarea type="text" :placeholder="$t('pages.chat.message')" v-model="inputText"
        class="!w-full resize-none dark:bg-black dark:!border-0" @keydown.enter.prevent.stop="sendMessage" />
      <Button class="self-start !px-7.5" @click="sendMessage" :disabled="inputText.length < 1">{{ $t('pages.chat.send')
        }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { showModal } = useModal()
const { t } = useI18n()
const user = useSupabaseUser()
const route = useRoute()

const slug = route.params.slug
const inputText = ref('')

const { connectSocket, connected, messages, error, send } = useChat()

onBeforeMount(() => {
  if (slug) {
    connectSocket(slug as string)
  }
})

const sendMessage = async () => {
  if (!inputText.value) return
  if (!user.value) {
    showModal(t('pages.chat.login_to_chat'))
    return
  }

  send(inputText.value)
  inputText.value = ''
}
</script>