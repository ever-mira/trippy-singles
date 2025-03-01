<template>
  <div class="p-1.5 rounded-xl mt-7 lg:mt-0 mb-17">
    <div class="p-3 bg-white dark:bg-black bg-opacity-50 rounded-xl min-h-100 max-h-120 overflow-y-scroll"
      ref="scrollContainer">
      <div class="text-gray-600" v-if="!connected">
        Connecting...
      </div>
      <div class="text-gray-600" v-if="connected">
        [Du bist im Raum: {{ slug }}]
      </div>
      <div class="text-gray-600" v-if="error">
        Fehler beim Herstellen der Verbindung
      </div>
      <div class="p-1.5 w-fit rounded-xl" v-for="message in messages" v-if="messages">
        <span class="font-semibold">{{ message.user.username }}</span>
        <div>{{ message.content }}</div>
      </div>
    </div>
    <div class="flex gap-x-2 mt-3">
      <Textarea type="text" placeholder="" v-model="inputText"
        class="!w-full resize-none dark:bg-black dark:!border-0 rounded-xl" @keydown.enter.prevent.stop="sendMessage" />
      <Button color="indigo_dark" class="self-start !px-6.5 !py-2 mt-2 md:mt-0" @click="sendMessage">
        <PaperAirplaneIcon class="inline w-5.5 text-white -mt.5" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid"
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

const scrollContainer = useTemplateRef("scrollContainer")

onMounted(() => {
  scrollToBottom()
})

watch(
  () => messages.value.length,
  async () => {
    await nextTick()
    scrollToBottom()
  }
)

function scrollToBottom() {
  scrollContainer.value?.scrollTo(0, scrollContainer.value.scrollHeight)
}
</script>