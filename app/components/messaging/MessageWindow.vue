<template>
  <div class="flex flex-row gap-x-2 !w-full mt-9 md:mx-auto rounded-xl">
    <div class="hidden xl:flex mb-22 pr-2">
      <NuxtLink :to="`/@${profile?.username}`" class="mt-auto">
        <NuxtImg :src="profile.avatar_url || ''" class="w-15 rounded-full" height="70" width="70" fit="cover"
          v-if="profile.avatar_url" />
        <PlaceholderAvatar v-else />
      </NuxtLink>
    </div>
    <div class="grow xl:min-w-140 max-w-170">
      <div class="p-1 text-gray-500" v-if="!messages || messages.length < 1">
        Noch keine Nachrichten.
      </div>
      <div class="min-h-10 lg:min-h-70 max-h-92 overscroll-x-none overflow-y-scroll no-scrollbar" ref="scrollContainer">
        <div v-for="message in messages" :key="message.id" class="w-full p-1">
          <div v-if="message.sender_id === user.id">
            <div class="flex justify-end">
              <div
                class="bg-white dark:bg-gray-900 py-3.9 px-3 leading-none rounded-tl-xl rounded-tr-xl rounded-bl-xl shadow-mdsm max-w-80% md:max-w-60% lg:max-w-50%">
                {{ message.content }}
              </div>
            </div>
          </div>
          <div v-else>
            <div class="flex justify-start">
              <div
                class="bg-white dark:bg-gray-900 py-3.9 px-3 leading-none rounded-tl-xl rounded-tr-xl rounded-br-xl shadow-mdsm max-w-80% md:max-w-60% lg:max-w-50%">
                {{ message.content }}
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-3"></div>
      </div>
      <div class="md:flex gap-x-3 pt-1">
        <Textarea type="text" placeholder="Nachricht" class="!w-full resize-none dark:bg-black !rounded-xl h-22 lg:h-18"
          @keydown.enter.prevent="sendMessage" v-model="message" ref="textArea" focus />
        <Button color="indigo_dark" class="self-start !px-6.5 !py-2 mt-2 md:mt-0" @click="sendMessage">
          <PaperAirplaneIcon class="inline w-5.5 text-white -mt.5" />
        </Button>
      </div>
    </div>
    <div class="hidden xl:flex flex-col ml-2 pb-22" v-if="ownProfile">
      <NuxtLink :to="`/@${ownProfile?.username}`" class="mt-auto">
        <NuxtImg :src="ownProfile.avatar_url || ''" class="w-15 rounded-full" height="70" width="70" fit="cover"
          v-if="ownProfile.avatar_url" />
        <PlaceholderAvatar v-else />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type Profile = Tables<"profiles">

import { PaperAirplaneIcon } from "@heroicons/vue/24/solid"

const props = defineProps({
  profile: {
    type: Object as PropType<Profile>,
    required: true,
  },
})

const user = useSupabaseUser()
const { setCurrentConversation } = useConversations()
const { profile: ownProfile } = useUser()

const messagesComposable = useMessages(props.profile.user_id)

const { messages, fetchMessages, message, sendMessage } = messagesComposable

setCurrentConversation(messagesComposable)

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

if (user.value) {
  await fetchMessages()
}

function scrollToBottom() {
  scrollContainer.value?.scrollTo(0, scrollContainer.value.scrollHeight)
}

onUnmounted(() => {
  setCurrentConversation(null)
})
</script>
