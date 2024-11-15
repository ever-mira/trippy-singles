<template>
  <div class="text-center mt-40">

    <form class="grid gap-4 form-widget" @submit.prevent="updateProfile">
      <div>
        <label for="email">Email</label>
        <input id="email" type="text" :value="user?.email" disabled
          class="px-3 py-2 w-[200px] border-2 border-indigo-300 focus:border-indigo-400 rounded-lg outline-none ml-3" />
      </div>
      <div>
        <label for="username">Username</label>
        <input id="username" type="text" v-model="username"
          class="px-3 py-2 w-[200px] border-2 border-indigo-300 focus:border-indigo-400 rounded-lg outline-none ml-3" />
      </div>
      <div>
        <label for="website">Website</label>
        <input id="website" type="url" v-model="website"
          class="px-3 py-2 w-[200px] border-2 border-indigo-300 focus:border-indigo-400 rounded-lg outline-none ml-3" />
      </div>

      <div>
        <input type="submit"
          class="px-3 py-2 bg-indigo-500 rounded-lg text-white hover:ring-3 transition-all duration-200 ml-4 shadow-lg shadow-indigo-200 cursor-pointer"
          :value="loading ? 'Loading ...' : 'Update'" :disabled="loading" />
      </div>

      <div>
        <button
          class="px-3 py-2 bg-indigo-500 rounded-lg text-white hover:ring-3 transition-all duration-200 ml-4 shadow-lg shadow-indigo-200 cursor-pointer"
          @click="signOut" :disabled="loading">Sign Out</button>
      </div>
    </form>
  </div>
</template>


<script setup lang="ts">
import type { User } from '@supabase/supabase-js'
import type { Database } from '../../types/database.types'
type ProfileData = Database['public']['Tables']['profiles']['Row']

const supabase = useSupabaseClient()

const username = ref('')
const website = ref('')
const avatar_path = ref('')
const loading = ref(false)

const user: Ref<User | null> = useSupabaseUser()

if (user.value) {
  const { data, error, status } = await useLazyFetch<ProfileData>(`/api/profile?userId=${user.value.id}`, {
    method: 'GET',
    headers: useRequestHeaders(['cookie']),
  })

  if (data.value) {
    username.value = data.value.username ?? ''
    website.value = data.value.website ?? ''
    avatar_path.value = data.value.avatar_url ?? ''
  }
}

async function updateProfile() {
  try {
    const user = useSupabaseUser()

    if (user.value) {
      const updates = {
        id: user.value.id,
        username: username.value,
        website: website.value,
        avatar_url: avatar_path.value,
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

async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  } catch (error: any) {
    console.log(error.message)
  } finally {
  }
}
</script>
