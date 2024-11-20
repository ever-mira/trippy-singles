<template>

  <div>

    <div class="flex flex-col md:flex-row max-w-340 justify-between mt-30 lg:mt-40 -ml-3 md:mx-auto min-h-74">
      <div class="">
        <img src="../assets/entry.png" class="dark:hidden w-120">
        <img src="../assets/entry_dark.png" class="hidden dark:block w-124">
        <div class="ml-5 md:ml-7">
          <div class="mt-2 text-lg">
            {{ $t('app.subtitle') }}
          </div>
          <div class="mt-9">
            <div v-if="!user">
              <Button color="red" @click="startClick" class="!px-8">
                {{ $t('app.start') }}
              </Button>

              <Button color="transparent" @click="loginClick" class="!px-7">
                {{ $t('app.login') }}
              </Button>
            </div>
            <div v-if="user">
              <Button color="indigo" to="/account/" class="!px-6">
                {{ $t('app.your_profile') }}
              </Button>
            </div>

          </div>
        </div>
      </div>

      <div class="ml-4 md:ml-0 w-60% mt-14 md:mt-0">
        <transition name="stepChange" mode="out-in">
          <component :is="stepComponent"></component>
        </transition>
      </div>
    </div>

    <div class="mt-20 max-w-340 mx-auto">
      <UserList class="ml-5 md:ml-7" />
    </div>


  </div>
</template>


<script setup lang="ts">
import useAuth from '../service/auth'

import Login from '../components/auth/Login.vue'
import SignupStepUsername from '../components/auth/SignupStepUsername.vue'
import UserList from '../components/user/UserList.vue'
import Loggedin from '~/components/auth/Loggedin.vue';
import Puzzle from '~/components/auth/Puzzle.vue';

const { stepComponent, setStepComponent, reset } = useAuth()

definePageMeta({
  auth: false,
});

const user: Ref = useSupabaseUser()

if (user.value) {
  setStepComponent(Loggedin)
} else {
  setStepComponent(Puzzle)
}

const startClick = () => {
  reset()
  setStepComponent(SignupStepUsername)
}

const loginClick = () => {
  setStepComponent(Login)
}

</script>

<style>
.stepChange-leave-active {
  transition: all 0.2s ease;
}

.stepChange-enter-active {
  transition: all 0.2s ease;
}

.stepChange-leave-to {
  opacity: 0;
  transform: translateX(-4px);
}

.stepChange-enter-from {
  opacity: 0;
  transform: translateX(4px);
}
</style>