<template>
  <div class="-ml.5">
    <div class="ml-3 md:ml-7">

      <div class="text-[2.55rem] lg:text-[3rem] gradient-glow-text mt-8 font-medium font-figtree"
        data-text="Puzzle Social">
        <span class="whitespace-nowrap">Puzzle Social
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
      <div
        class="text-[2.2rem] lg:text-[3rem] font-bold font-figtree text-gray-800 dark:text-gray-100 md:mt-.9 whitespace-nowrap">
        Social
        Network.</div>

      <div class="mt-2 text-lg">
        {{ $t('app.subtitle') }}
      </div>

      <div class="mt-8 lg:mt-9">
        <div v-if="!user">
          <Button color="red" @click="startClick" class="!px-8">
            {{ $t('app.start') }}
          </Button>

          <Button color="transparent" @click="loginClick" class="!px-7 ml-1.5">
            {{ $t('app.login') }}
          </Button>
        </div>
        <div v-if="user">
          <Button color="indigo" :to="`/@${profile?.username}`" class="!px-5">
            {{ $t('app.your_profile') }}
          </Button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Login from '../steps/Login.vue'
import SignupStepUsername from '../steps/SignupStepUsername.vue'

const user: Ref = useSupabaseUser()
const { profile } = useUser()
const { setStepComponent } = useSignup()

const startClick = () => {
  setStepComponent(SignupStepUsername)
}

const loginClick = () => {
  setStepComponent(Login)
}
</script>

<style>
:root {
  --color-error: rgba(255, 0, 122, 0.5);
  --color-secondary: rgba(125, 0, 255, 0.5);
  --color-primary: rgba(0, 170, 255, 0.5);
  --color-accent: rgba(0, 255, 217, 0.5);
}

.gradient-glow-text {
  position: relative;
  font-weight: 700;
  color: transparent;
  line-height: 35px;
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
  filter: blur(15px);
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