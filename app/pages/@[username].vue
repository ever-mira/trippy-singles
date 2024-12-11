<template>
  <Page>
    <Heading v-if="profile">
      {{ profile.username }}
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

    <div class="flex flex-col lg:flex-row">
      <div>
        <div class="mt-9 lg:mt-11" v-if="profile">
          <ProfilePicture />
        </div>

        <ProfileActions />

        <div class="mt-9">
          <Button @click="goBack" class="!px-7.5">{{ $t('profile.back') }}</Button>
        </div>
      </div>
      <div class="w-full">
        <NuxtPage class="w-full lg:px-19 mt-13 lg:mt-0" />
      </div>
    </div>


    <div class="h-60"></div>
  </Page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ProfilePicture from '~/components/profile/ProfilePicture.vue'
import ProfileActions from '~/components/profile/ProfileActions.vue'

const router = useRouter()
const route = useRoute()

const { profile, loadProfile } = useProfile()

const username = route.params.username

if (username) {
  await loadProfile(username as string)
}

const goBack = () => {
  router.back()
}


</script>