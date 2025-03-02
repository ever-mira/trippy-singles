<template>
  <div v-if="!isOwnProfile">
    <div>
      <Button color="white" size="small" class="border dark:border-gray-700 !font-normal"
        :to="`/conversations/@${profile?.username}`">
        <PaperAirplaneIcon class="inline w-5.5 text-gray-500 -mt.5 mr-1" />
        {{ t('send_message') }}
      </Button>
    </div>
    <div class="mt-4">
      <Button color="white" @click="showModal('Coming soon.')" size="small"
        class="border dark:border-gray-700 !font-normal">
        <UserPlusIcon class="inline w-5.5 text-gray-500 -mt.5" />
        {{ t('add_friend') }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import { UserPlusIcon } from '@heroicons/vue/24/outline'

const { profile, isOwnProfile } = useProfile()
const { showModal } = useModal()
const { t } = useI18n()
</script>

<i18n lang="json">{
  "de": {
    "send_message": "Nachricht senden",
    "add_friend": "Als Freund hinzufügen"
  },
  "en": {
    "send_message": "Send message",
    "add_friend": "Add as friend"
  }
}</i18n>
