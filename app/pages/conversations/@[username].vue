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

    <MessageWindow :userId="profile.user_id" v-if="profile?.user_id" />

    <div class="mt-7">
      <Button @click="goBack" class="!px-8">Zurück</Button>
    </div>
    <div class="h-60"></div>
  </Page>
</template>

<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type Profile = Tables<'profiles'>
import MessageWindow from '~/components/messaging/MessageWindow.vue'

const route = useRoute()
const router = useRouter()
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

const goBack = () => {
  router.back()
}

</script>