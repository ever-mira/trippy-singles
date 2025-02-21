<template>
  <div v-if="!isOwnProfile">
    <div>
      <Button color="white" size="small" class="border dark:border-gray-700 !font-normal"
        :to="`/conversations/@${profile?.username}`">
        <PaperAirplaneIcon class="inline w-5.5 text-gray-500 -mt.5 mr-1" />
        Nachricht senden
      </Button>
    </div>
    <div class="mt-4">
      <Button color="white" @click="showModal('Coming soon.')" size="small"
        class="border dark:border-gray-700 !font-normal">
        <UserPlusIcon class="inline w-5.5 text-gray-500 -mt.5" />
        Als Freund hinzufügen
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import { UserPlusIcon } from '@heroicons/vue/24/outline'

const { profile, isOwnProfile } = useProfile()
const { showModal } = useModal()
</script>
