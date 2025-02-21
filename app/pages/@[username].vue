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

    <div class="flex flex-col lg:flex-row shrink">
      <div id="left_column">
        <div class="mt-9" v-if="profile">
          <ProfilePicture />
        </div>

        <div class="flex flex-col md:flex-row">
          <ProfileLocation class="mt-13" />
        </div>

        <ProfileActions class="mt-12" />

        <div class="hidden lg:block mt-21 lg:mt-27">
          <Button @click="goBack" class="!px-7.5">{{ $t('profile.back') }}</Button>
        </div>
      </div>

      <div id="right_column" class="flex flex-col flex-1 grow pt-13 lg:pt-1 lg:ml-7 xl:ml-11 2xl:ml-17 3xl:ml-22">
        <ProfileSocialMedia class="w-full" />

        <ProfileQuestion class="lg:mt-7" field_name="about_question">
          <HeartIcon class="inline w-5.4 text-gray-900 dark:text-gray-200 -mt-1 mr-0.8" />
          Über mich
          <template v-slot:subtitle>
            Über Dich, Psychedelica, Realität und Erkenntnisse
          </template>
        </ProfileQuestion>

        <ProfileQuestion field_name="festival_question">
          <RocketLaunchIcon class="inline w-5.5 text-gray-900 dark:text-gray-200 -mt-1 mr-1" />
          Festivals
          <template v-slot:subtitle>
            Auf welchen Festivals warst du? Was waren deine Eindrücke?
          </template>
        </ProfileQuestion>

        <ProfileQuestion field_name="future_question">
          <PhotoIcon class="inline w-5.5 text-gray-900 dark:text-gray-200 -mt-1 mr-1" />
          Vision of the Future
          <template v-slot:subtitle>
            Wie siehst du die Zukunft? Was sind deine größten Visionen?
          </template>
        </ProfileQuestion>

        <ProfileTimeline :registerDate="profile.created_at" :userId="profile.user_id" class="mt-17" />
      </div>
    </div>

    <div class="lg:hidden mt-21 lg:mt-27">
      <Button @click="goBack" class="!px-7.5">{{ $t('profile.back') }}</Button>
    </div>

    <div class="h-60"></div>
  </Page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ProfilePicture from '~/components/profile/ProfilePicture.vue'
import ProfileActions from '~/components/profile/ProfileActions.vue'
import ProfileLocation from '~/components/profile/ProfileLocation.vue'
import ProfileSocialMedia from '~/components/profile/ProfileSocialMedia.vue'
import ProfileTimeline from '~/components/profile/ProfileTimeline.vue'
import ProfileQuestion from '~/components/profile/ProfileQuestion.vue'
import { HeartIcon } from '@heroicons/vue/24/outline';
import { PhotoIcon } from '@heroicons/vue/24/outline';
import { RocketLaunchIcon } from '@heroicons/vue/24/outline';

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