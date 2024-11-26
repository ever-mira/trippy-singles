<template>
  <Page>
    <Heading v-if="profile">
      {{ profile.displayname }}
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

    <div class="mt-9 lg:mt-11" v-if="profile">
      <img :src="profile.avatar_url || undefined" class="rounded-lg max-w-55 md:max-w-69 mt-10"
        v-if="profile.avatar_url">
      <img src="../assets/avatar.jpg" class="rounded-lg max-w-55 md:max-w-69 mt-10" v-else>
      <photo-upload @uploaded="onPhotoUploaded" :change="profile.avatar_url !== null" class="mt-6"
        v-if="isOwnProfile"></photo-upload>
    </div>

    <div class="mt-9">
      <Button @click="goBack" class="!px-8">{{ $t('profile.back') }}</Button>
    </div>

    <div class="h-60"></div>
  </Page>
</template>

<script setup lang="ts">
import type { Database } from '../../types/database.types'
type ProfileData = Database['public']['Tables']['profiles']['Row']
import { useRoute } from 'vue-router'
import PhotoUpload from '~/components/user/PhotoUpload.vue'

const { username: ownUsername } = useUser()
const router = useRouter()
const route = useRoute()
const username = route.params.username

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
}

const goBack = () => {
  router.back()
}

</script>