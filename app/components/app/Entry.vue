<template>
  <div class="-ml.5">
    <div class="ml-3 md:ml-7">

      <div class="text-[2.55rem] lg:text-[3.3rem] gradient-glow-text mt-8 font-figtree" data-text="Puzzle Social z-10">
        <span class="whitespace-nowrap">{{ entryTitle }}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>

      <div v-if="isTrippySingles"
        class="text-[1.9rem] lg:text-[2rem] font-bold font-figtree text-gray-800 dark:text-gray-100 md:mt-.9 whitespace-nowrap">
        Findet euch.</div>

      <div v-else
        class="text-[1.9rem] lg:text-[2.24rem] font-bold font-figtree text-gray-800 dark:text-gray-100 md:mt-.4 whitespace-nowrap">
        Psychedelic Network.</div>


      <div class="mt-2 text-lg" v-if="isTrippySingles">
        {{ $t('app.subtitle') }}
      </div>

      <div class="mt-2 text-lg" v-else>
        Das Soziale Netzwerk für Psychonauten.
      </div>

      <div class="mt-8 lg:mt-9">
        <div v-if="!user">
          <Button color="blue" @click="startClick" class="!px-8">
            {{ $t('app.start') }}
          </Button>

          <Button color="white" @click="loginClick" class="!px-7 ml-1.5">
            {{ $t('app.login') }}
          </Button>
        </div>
        <div v-if="user">
          <Button color="indigo" :to="`/@${profile?.username}`" class="!px-5">
            {{ $t('app.your_profile') }}
          </Button>
        </div>

        <div class="flex gap-x-4 mt-20">
          <div>

            <h3 class="text-2xl">
              <BeakerIcon class="inline w-7.4 text-blue-500 dark:text-blue-600 -mt-1.7 mr-3" />Trip-Berichte.
            </h3>

            <span class="block text-lg mt-.5">Kannst du dich noch an deine ersten Trips erinnern?</span><br>
            <NuxtLink to="/reports"
              class="block text-blue-700 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 text-lg -mt-1">
              Trip-Berichte →
            </NuxtLink>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import Login from '../steps/Login.vue'
import SignupStepUsername from '../steps/SignupStepUsername.vue'
import { BeakerIcon } from '@heroicons/vue/24/solid'

const user: Ref = useSupabaseUser()
const { profile } = useUser()
const { setStepComponent } = useSteps()

const url = useRequestURL()
const isTrippySocial = url.hostname === 'trippy.social'
const isTrippySingles = url.hostname === 'trippy.singles'

const entryTitle = computed(() => {
  return isTrippySingles ? 'Trippy. Singles.' : 'Trippy.'
})

const startClick = () => {
  setStepComponent(SignupStepUsername)
}

const loginClick = () => {
  setStepComponent(Login)
}
</script>

<style>
:root {
  --color-error: rgba(255, 0, 122, 0.35);
  --color-secondary: rgba(125, 0, 255, 0.35);
  --color-primary: rgba(0, 170, 255, 0.35);
  --color-accent: rgba(0, 255, 217, 0.35);
}

.gradient-glow-text {
  position: relative;
  font-weight: 600;
  color: transparent;
  line-height: 50px;
}

.gradient-glow-text::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg,
      var(--color-error) 0%,
      var(--color-secondary) 40%,
      var(--color-primary) 60%,
      var(--color-accent) 100%);
  filter: blur(19px);
  z-index: -1;
}

.gradient-glow-text span {
  background: linear-gradient(90deg,
      rgb(255, 0, 128) 0%,
      rgba(125, 0, 255, 1) 40%,
      rgb(0, 140, 255) 60%,
      rgb(0, 166, 195) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>