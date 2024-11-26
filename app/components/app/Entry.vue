<template>
  <div class="-ml.5">
    <img src="../../assets/entry.png" class="dark:hidden w-120 scale-107 lg:scale-100">
    <img src="../../assets/entry_dark.png" class="hidden dark:block w-120 scale-107 lg:scale-100">

    <div class="ml-3 md:ml-7">
      <div class="mt-2 text-lg">
        {{ $t('app.subtitle') }}
      </div>

      <div class="mt-8 lg:mt-9">
        <div v-if="!user">
          <Button color="red" @click="startClick" class="!px-8">
            {{ $t('app.start') }}
          </Button>

          <Button color="transparent" @click="loginClick" class="!px-7">
            {{ $t('app.login') }}
          </Button>
        </div>
        <div v-if="user">
          <Button color="indigo" :to="`/@${username}`" class="!px-5">
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
const { username } = useUser()
const { setStepComponent } = useSignup()

const startClick = () => {
  setStepComponent(SignupStepUsername)
}

const loginClick = () => {
  setStepComponent(Login)
}
</script>
