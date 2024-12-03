<template>
  <div>
    <div class="mt-9 relative text-3xl font-bold text-heading">{{ $t('signup.logged_in') }}</div>
    <div class="mt-9 relative">
      {{ $t('signup.set_picture_hint') }}
    </div>

    <div class="mt-7">
      <AvatarRoot>
        <AvatarImage :src="photoUrl" class="w-40 rounded-full" />
        <AvatarFallback>
          <img src="../../assets/avatar.jpg" class="w-40 rounded-full" />
        </AvatarFallback>
      </AvatarRoot>
      <photo-upload @uploaded="onPhotoUploaded" class="mt-6.5"></photo-upload>
    </div>
  </div>
</template>


<script setup lang="ts">
import PhotoUpload from '~/components/user/PhotoUpload.vue'
import Loggedin from './Loggedin.vue'
const { setStepComponent } = useSignup()

const photoUrl = ref('')

const onPhotoUploaded = (fileName: string) => {
  photoUrl.value = fileName
  setStepComponent(Loggedin)
}
</script>
