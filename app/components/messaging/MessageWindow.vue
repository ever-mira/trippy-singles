<template>
    <div class="!w-full xl:min-w-140 max-w-170 mt-9 rounded-xl">
        <div class="p-1 text-gray-500" v-if="!messages || messages.length < 1">Noch keine Nachrichten.</div>
        <div class="min-h-10 lg:min-h-50 max-h-90 overscroll-x-none overflow-y-scroll no-scrollbar"
            ref="scrollContainer">
            <div v-for="message in messages" :key="message.id" class="w-full p-1">
                <div v-if="message.sender_id === user.id">
                    <div class="flex justify-end">
                        <div
                            class="bg-white dark:bg-gray-900 p-3 rounded-tl-xl rounded-tr-xl rounded-bl-xl shadow-mdsm max-w-80% md:max-w-60% lg:max-w-50%">
                            {{ message.content }}
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="flex justify-start">
                        <div
                            class="bg-white dark:bg-gray-900 p-3 rounded-tl-xl rounded-tr-xl rounded-br-xl shadow-mdsm max-w-80% md:max-w-60% lg:max-w-50%">
                            {{ message.content }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full h-3"></div>
        </div>
        <div class="md:flex gap-x-2 mt-4 pb-3">
            <Textarea type="text" placeholder="Nachricht"
                class="!w-full resize-none dark:bg-black !rounded-xl h-22 lg:h-18" @keydown.enter.prevent="sendMessage"
                v-model="message" ref="textArea" focus />
            <Button color="indigo_dark" class="self-start !px-7.5 mt-2 md:mt-0" @click="sendMessage">
                <PaperAirplaneIcon class="inline w-5.5 text-white -mt.5" />
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
    userId: {
        type: String,
        required: true
    },
})

const user: Ref = useSupabaseUser()
const { setCurrentConversation } = useConversations()

const messagesComposable = useMessages(props.userId)
const { messages, fetchMessages, listenToNewMessages, message, sendMessage } = messagesComposable
setCurrentConversation(messagesComposable)

const scrollContainer = ref<HTMLElement | null>(null)
const textArea = ref<HTMLElement | null>(null)

onMounted(() => {
    scrollToBottom()
    // listenToNewMessages()
})

watch(() => messages.value.length, async () => {
    await nextTick()
    scrollToBottom()
})

await fetchMessages()

function scrollToBottom() {
    scrollContainer.value?.scrollTo(0, scrollContainer.value.scrollHeight)
}

onUnmounted(() => {
    setCurrentConversation(null)
})

</script>