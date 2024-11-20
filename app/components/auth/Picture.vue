<template>
  <div class="w-full text-lg -mt-5">
    <div class="w-full px-2 md:w-[360px]">
      <div class="mt-9 relative text-3xl font-bold text-heading">Eingeloggt</div>
      <div class="mt-9 relative">
        Setze ein Profilbild, wenn du möchtest.
      </div>

      <div class="mt-7">
        <AvatarRoot>
          <AvatarImage :src="photoUrl" class="w-44 rounded-full" />
          <AvatarFallback>
            <img src="../../assets/avatar.jpg" class="w-44 rounded-full" />
          </AvatarFallback>
        </AvatarRoot>
        <photo-upload @uploaded="onPhotoUploaded" class="mt-6.5"></photo-upload>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import PhotoUpload from '~/components/user/PhotoUpload.vue';

const supabase = useSupabaseClient()

const credentials = reactive({
  email: '',
  password: ''
})

const message = ref('')

const photoUrl = ref('')

const signIn = async () => {
  message.value = ''
  const { error } = await supabase.auth.signInWithPassword(credentials)
  if (error) message.value = error.message
}

const onPhotoUploaded = (fileName: string) => {
  console.log('uploaded', fileName)
  photoUrl.value = fileName
}
</script>
