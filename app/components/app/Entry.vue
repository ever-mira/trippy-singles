<template>
  <div>
    <div class="text-[2.65rem] lg:text-[3.3rem] gradient-glow-text mt-8 font-figtree" data-text="Trippy">
      <span class="whitespace-nowrap" v-if="isTrippySingles">{{ t("trippy_singles")
      }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <span class="whitespace-nowrap" v-else>{{ t("trippy") }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    </div>

    <div v-if="isTrippySingles"
      class="text-[1.9rem] xl:text-[2rem] font-bold font-figtree text-gray-800 dark:text-gray-100 md:mt-.9 whitespace-nowrap">
      {{ t("find_each_other") }}
    </div>

    <div v-else
      class="text-[1.9rem] xl:text-[2.2rem] font-bold font-figtree text-gray-800 dark:text-gray-100 md:mt-.4 whitespace-nowrap">
      {{ t("psychedelic_network") }}
    </div>

    <div class="mt-2 text-lg" v-if="isTrippySingles">
      {{ t("dating_platform_for_psychonauts") }}
    </div>

    <div class="mt-2 text-lg" v-else>
      {{ t("social_network_for_psychonauts") }}
    </div>

    <div class="mt-8 lg:mt-9">
      <div v-if="!user">
        <Button color="blue" @click="startClick" class="!px-8.45">
          {{ t("start") }}
        </Button>

        <Button color="white" @click="loginClick" class="!px-7.45 ml-1.5">
          {{ t("login") }}
        </Button>
      </div>
      <div v-if="user">
        <Button color="indigo" :to="`/@${profile?.username}`" class="!px-5">
          {{ t("your_profile") }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Login from "../steps/Login.vue"
import SignupStepUsername from "../steps/SignupStepUsername.vue"

const user: Ref = useSupabaseUser()
const { profile } = useUser()
const { setStepComponent } = useSteps()

const url = useRequestURL()
const isTrippySocial = url.hostname === "trippy.social"
const isTrippySingles = url.hostname === "trippy.singles"

const startClick = () => {
  setStepComponent(SignupStepUsername)
}

const loginClick = () => {
  setStepComponent(Login)
}

const { t } = useI18n()
</script>


<i18n lang="json">{
  "de": {
    "trippy": "Trippy.",
    "trippy_singles": "Trippy. Singles.",
    "find_each_other": "Findet euch.",
    "psychedelic_network": "Psychedelic Network.",
    "dating_platform_for_psychonauts": "Das Dating-Portal für Psychonauten.",
    "social_network_for_psychonauts": "Das Soziale Netzwerk für Psychonauten.",
    "start": "Start",
    "login": "Login",
    "your_profile": "Dein Profil",
  },
  "en": {
    "trippy": "Trippy.",
    "trippy_singles": "Trippy. Singles.",
    "find_each_other": "Connect & Find Love.",
    "psychedelic_network": "Psychedelic Network.",
    "dating_platform_for_psychonauts": "Dating-Portal for Psychonauts.",
    "social_network_for_psychonauts": "Social Network for Psychonauts.",
    "start": "Start",
    "login": "Login",
    "your_profile": "Your Profile",
  }
}</i18n>


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
  opacity: 0.7;
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
