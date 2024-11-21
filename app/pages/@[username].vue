<template>
  <div class="mt-20 max-w-screen-lg mx-auto">
    <h1 class="text-4xl tracking-tight" v-if="profile">
      {{ profile.username }}
    </h1>
    <h1 class="text-4xl tracking-tight" v-else>
      User nicht gefunden.
    </h1>
    <div class="mt-11" v-if="profile">
      <img :src="profile.avatar_url || undefined" class="rounded-lg md:max-w-69 mt-10" v-if="profile.avatar_url">
      <img src="../assets/avatar.jpg" class="rounded-lg md:max-w-69 mt-10" v-else>
      <photo-upload @uploaded="onPhotoUploaded" :change="profile.avatar_url !== null" class="mt-6"
        v-if="isOwnProfile"></photo-upload>
    </div>

    <div class="mt-9">
      <Button @click="goBack" class="!px-8">Zurück</Button>
    </div>

    <div class="h-60"></div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Database } from '../../types/database.types'
type ProfileData = Database['public']['Tables']['profiles']['Row']
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
  const { data, error, status } = await useFetch<ProfileData>(`/api/users/${username}/profile`, {
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