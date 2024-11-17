<template>

  <div>

    <div class="flex flex-col md:flex-row max-w-340 justify-between mt-30 lg:mt-40 -ml-3 md:mx-auto">
      <div class="">
        <img src="../assets/entry.png" class="dark:hidden w-120">
        <img src="../assets/entry_dark.png" class="hidden dark:block w-124">
        <div class="ml-5 md:ml-7">
          <div class="mt-2 text-lg">
            {{ $t('app.subtitle') }}
          </div>
          <div class="mt-8">
            <div v-if="!user">
              <Button color="red" @click="startClick" class="!px-8">
                {{ $t('app.start') }}
              </Button>

              <Button color="transparent" @click="loginClick" class="!px-7">
                {{ $t('app.login') }}
              </Button>
            </div>
            <div v-if="user">
              <Button color="indigo" to="/account/" class="!px-6.5">
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

    <!-- <UserList /> -->

  </div>
</template>


<script setup lang="ts">
import useAuth from '../service/auth'

import Login from '../components/auth/Login.vue'
import Signup from '../components/auth/Signup.vue'
import UserList from '../components/user/UserList.vue'

const { stepComponent, setStepComponent } = useAuth()

definePageMeta({
  auth: false,
});

const user: Ref = useSupabaseUser()

const email = ref('')
const password = ref('')


const startClick = () => {
  setStepComponent(Signup)
}

const loginClick = () => {
  setStepComponent(Login)
}

</script>

<style>
.stepChange-leave-active {
  transition: all 0.19s ease;
}

.stepChange-enter-active {
  transition: all 0.19s ease;
}

.stepChange-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.stepChange-enter-from {
  opacity: 0;
  transform: translateX(10px);
}
</style>