<template>
  <div>
    <div class="mt-9 relative text-3xl font-bold text-heading">{{ $t('signup.logged_in') }}</div>
    <div class="mt-9 relative">
      {{ $t('signup.set_picture_hint') }}
    </div>

    <div class="mt-7" v-if="profile">
      <NuxtImg :src="profile.avatar_url" width="300" class="rounded-lg max-w-40 mt-10" v-if="profile.avatar_url" />
      <img src="../../assets/avatar.jpg" class="rounded-full max-w-40 mt-10" v-else>
      <photo-upload @uploaded="onPhotoUploaded" class="mt-6.5"></photo-upload>
    </div>
  </div>
</template>


<script setup lang="ts">
import PhotoUpload from '~/components/user/PhotoUpload.vue'
import Loggedin from './Loggedin.vue'
const { setStepComponent } = useSteps()
const { fetchUserData, profile } = useUser()
const { updateUserList } = useUsers()


const onPhotoUploaded = (supabaseUrl: string) => {
  preloadImages(supabaseUrl)
  fetchUserData()
  updateUserList()
}

function preloadImages(supabaseUrl: string): void {
  const createImageUrl = useImage()
  const cloudflareUrlBig = createImageUrl(supabaseUrl, { width: 300 }, { provider: 'cloudflare' })
  const cloudflareUrlSmall = createImageUrl(supabaseUrl, { width: 60, height: 60, fit: 'cover' }, { provider: 'cloudflare' })

  const imgS = new Image()
  imgS.src = cloudflareUrlSmall

  const imgB = new Image()
  imgB.src = cloudflareUrlBig
}
</script>
