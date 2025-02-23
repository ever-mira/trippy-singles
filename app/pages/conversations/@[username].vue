<template>
  <Page>
    <Heading>
      Nachricht
      <template v-slot:subtitle>
        Unterhaltung mit
        <NuxtLink :to="`/@${profile?.username}`" class="text-blue-600 hover:text-blue-500">@{{
          profile?.username }}
        </NuxtLink>
      </template>
    </Heading>

    <MessageWindow :profile="profile" v-if="profile" />

    <BackButton />

  </Page>
</template>

<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type Profile = Tables<'profiles'>
import MessageWindow from '~/components/messaging/MessageWindow.vue'

const route = useRoute()
const user: Ref = useSupabaseUser()

const with_username = route.params.username
const profile = ref<Profile | null>(null)

if (user.value) {
  await fetchProfile()
}

async function fetchProfile() {
  if (with_username) {
    const { data } = await useFetch<Profile>(`/api/users/${with_username}/profile`, {
      method: 'GET',
      headers: useRequestHeaders(['cookie']),
    })

    if (data.value) {
      profile.value = data.value
    }
  }
}
</script>