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

    <div class="flex flex-col lg:flex-row shrink" v-if="profile">
      <div id="left_column">
        <div class="mt-9">
          <ProfilePicture />
        </div>

        <div class="flex flex-col md:flex-row">
          <ProfileLocation class="mt-13" />
        </div>

        <ProfileActions class="mt-12" />

        <div class="hidden lg:block">
          <BackButton />
        </div>
      </div>

      <div id="right_column" class="flex flex-col flex-1 grow pt-13 lg:pt-1 lg:ml-7 xl:ml-11 2xl:ml-17 3xl:ml-22">
        <ProfileSocialMedia class="w-full" />

        <ProfileQuestion class="lg:mt-7" field_name="about_question">
          <HeartIcon class="inline w-5.4 text-gray-900 dark:text-gray-200 -mt-1 mr-0.8" />
          {{ t('about_me') }}
          <template v-slot:subtitle>
            {{ t('about_me_hint') }}
          </template>
        </ProfileQuestion>

        <ProfileQuestion field_name="festival_question">
          <RocketLaunchIcon class="inline w-5.5 text-gray-900 dark:text-gray-200 -mt-1 mr-1" />
          {{ t('festivals') }}
          <template v-slot:subtitle>
            {{ t('festivals_hint') }}
          </template>
        </ProfileQuestion>

        <ProfileQuestion field_name="future_question">
          <PhotoIcon class="inline w-5.5 text-gray-900 dark:text-gray-200 -mt-1 mr-1" />
          {{ t('vision') }}
          <template v-slot:subtitle>
            {{ t('vision_hint') }}
          </template>
        </ProfileQuestion>

        <ProfileTimeline class="mt-17" />
      </div>
    </div>

    <div class="lg:hidden">
      <BackButton />
    </div>

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

const route = useRoute()

const { profile, loadProfile } = useProfile()

const username = route.params.username

if (username) {
  await loadProfile(username as string)
}

const { t } = useI18n()
</script>

<i18n lang="json">{
  "de": {
    "about_me": "Über mich",
    "about_me_hint": "Über Dich, Psychedelica, Realität und Erkenntnisse",
    "festivals": "Festivals",
    "festivals_hint": "Auf welchen Festivals warst du? Was waren deine Eindrücke?",
    "vision": "Vision of the Future",
    "vision_hint": "Wie siehst du die Zukunft? Was sind deine größten Visionen?"
  },
  "en": {
    "about_me": "About Me",
    "about_me_hint": "About you, psychedelics, reality, and insights",
    "festivals": "Festivals",
    "festivals_hint": "Which festivals have you attended? What were your impressions?",
    "vision": "Vision of the Future",
    "vision_hint": "How do you see the future? What are your biggest visions?"
  }
}</i18n>
