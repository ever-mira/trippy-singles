<template>
  <div class="mt-40 max-w-screen-lg mx-auto">
    <h1 class="text-4xl font-bold tracking-tight">
      Dein Account
    </h1>
    <div class="mt-11" v-if="profile">
      <img :src="profile.avatar_url || undefined" class="rounded-lg md:max-w-59 mt-10" v-if="profile.avatar_url">
      <img src="../assets/avatar.jpg" class="rounded-lg md:max-w-79 mt-10" v-else>
      <photo-upload @uploaded="onPhotoUploaded" :change="profile.avatar_url !== null" class="mt-4"></photo-upload>
    </div>

    <form class="grid gap-4 mt-21 form-widget" @submit.prevent="updateProfile" v-if="profile">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" :value="user?.email" disabled
          class="px-3 py-2 w-[200px] border-2 border-indigo-300 focus:border-indigo-400 rounded-lg outline-none ml-3" />
      </div>
      <div>
        <label for="username">Username</label>
        <input id="username" type="text" v-model="profile.username"
          class="px-3 py-2 w-[200px] border-2 border-indigo-300 focus:border-indigo-400 rounded-lg outline-none ml-3" />
      </div>
      <div>
        <label for="website">Website</label>
        <input id="website" type="url" v-model="profile.website"
          class="px-3 py-2 w-[200px] border-2 border-indigo-300 focus:border-indigo-400 rounded-lg outline-none ml-3" />
      </div>

      <div class="mt-6">
        <input type="submit"
          class="px-3 py-2 bg-indigo-500 rounded-lg text-white hover:ring-3 transition-all duration-200 ml-4 shadow-lg shadow-indigo-200 cursor-pointer"
          :value="loading ? 'Loading ...' : 'Update'" :disabled="loading" />
      </div>

    </form>
  </div>
</template>


<script setup lang="ts">
import type { User } from '@supabase/supabase-js'
import type { Database } from '../../types/database.types'
type ProfileData = Database['public']['Tables']['profiles']['Row']
import PhotoUpload from '~/components/user/PhotoUpload.vue'

const loading = ref(false)

const profile = ref<ProfileData | null>(null)

const user: Ref<User | null> = useSupabaseUser()

if (user.value) {
  const { data, error, status } = await useFetch<ProfileData>(`/api/profile?userId=${user.value.id}`, {
    method: 'GET',
    headers: useRequestHeaders(['cookie']),
  })

  if (data.value) {
    profile.value = data.value
  }
}

async function updateProfile() {
  try {
    const user = useSupabaseUser()

    if (user.value && profile.value) {
      const updates = {
        ...profile.value,
        id: user.value.id,
        updated_at: new Date(),
      }

      const { data, error } = await useFetch('/api/profile', {
        method: 'POST',
        body: updates,
        headers: useRequestHeaders(['cookie'])
      })
    }

  } catch (error: any) {
    console.log(error.message)
  } finally {

  }
}

const onPhotoUploaded = (fileName: string) => {
  if (profile.value) {
    profile.value.avatar_url = fileName
  }
}

</script>
