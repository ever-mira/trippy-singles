<template>
  <Page>
    <Heading v-if="profile">
      {{ profile.username }}
      <template v-slot:subtitle>
        @{{ profile.username }}
      </template>
    </Heading>
    <Heading v-else>
      {{ $t('profile.not_found') }}
      <template v-slot:subtitle>
        404
        <div class="h-20"></div>
      </template>
    </Heading>

    <div class="flex flex-col lg:flex-row">
      <div>
        <div class="mt-9 lg:mt-11" v-if="profile">

          <div class="md:bg-highlight md:dark:bg-highlight-dark rounded-lg md:p-3.5 mt-10">
            <NuxtImg :src="profile.avatar_url" width="300" class="rounded-lg max-w-55 md:max-w-64"
              v-if="profile.avatar_url" />
            <img src="../assets/avatar.jpg" class="rounded-lg max-w-55 md:max-w-64 mt-10" v-else>
          </div>

          <photo-upload @uploaded="onPhotoUploaded" :change="profile.avatar_url !== null" class="mt-6"
            v-if="isOwnProfile"></photo-upload>
        </div>

        <div class="mt-9">
          <Button color="transparent" size="small" class="border dark:border-gray-700 !font-normal"
            :to="`/conversations/@${profile?.username}`">
            <PaperAirplaneIcon class="inline w-5.5 text-gray-500 -mt.5 mr-1" />
            Nachricht senden
          </Button>
        </div>
        <div class="mt-4">
          <Button color="transparent" @click="showModal('Coming soon.')" size="small"
            class="border dark:border-gray-700 !font-normal">
            <UserPlusIcon class="inline w-5.5 text-gray-500 -mt.5" />
            Als Freund hinzufügen
          </Button>
        </div>

        <div class="mt-9">
          <Button @click="goBack" class="!px-8">{{ $t('profile.back') }}</Button>
        </div>
      </div>
      <div class="w-full">
        <NuxtPage class="w-full lg:px-19 mt-13 lg:mt-0" />
      </div>
    </div>


    <div class="h-60"></div>
  </Page>
</template>

<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type ProfileData = Tables<'profiles'>
import { useRoute } from 'vue-router'
import PhotoUpload from '~/components/user/PhotoUpload.vue'
import { PaperAirplaneIcon } from '@heroicons/vue/24/outline'
import { UserPlusIcon } from '@heroicons/vue/24/outline'

const { profile: ownProfile } = useUser()
const router = useRouter()
const route = useRoute()
const username = route.params.username
const ownUsername = ref(ownProfile.value?.username)

const profile = ref<ProfileData | null>(null)

const isOwnProfile = computed(() => {
  return profile.value?.username === ownUsername.value
})

if (username) {
  const { data } = await useFetch<ProfileData>(`/api/users/${username}/profile`, {
    method: 'GET',
    headers: useRequestHeaders(['cookie']),
  })

  if (data.value) {
    profile.value = data.value
  }
}

const onPhotoUploaded = (fileName: string) => {
  if (profile.value) {
    profile.value.avatar_url = fileName
  }
  if (ownProfile.value) {
    ownProfile.value.avatar_url = fileName
  }
}

const goBack = () => {
  router.back()
}

const { showModal } = useModal()
</script>