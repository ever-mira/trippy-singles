<template>
  <div class="md:bg-highlight md:dark:bg-highlight-dark rounded-lg md:p-3 mt-10 w-fit">
    <NuxtImg :src="profile.avatar_url" width="300" class="rounded-lg max-w-65 md:max-w-70 cursor-pointer"
      v-if="profile && profile.avatar_url" @click="showModal(profile.avatar_url)" />
    <img src="../../assets/avatar.jpg" class="rounded-lg max-w-55 md:max-w-65 mt-10" v-else>

    <!-- preload big image -->
    <NuxtImg :src="profile.avatar_url" height="910" class="hidden" v-if="profile && profile.avatar_url" />
  </div>

  <photo-upload @uploaded="onPhotoUploaded" :change="profile.avatar_url !== null" category="avatar" class="mt-6"
    v-if="profile && isOwnProfile"></photo-upload>
</template>

<script setup lang="ts">
import PhotoUpload from '~/components/user/PhotoUpload.vue'

const { profile, setAvatarUrl, isOwnProfile } = useProfile()

const onPhotoUploaded = (fileName: string) => {
  setAvatarUrl(fileName)
}

const { showModal } = useImageModal()
</script>
