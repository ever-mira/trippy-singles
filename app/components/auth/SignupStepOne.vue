<script setup lang="ts">
import useAuth from '../../service/auth'
import SignupStepTwo from './SignupStepTwo.vue'

const { setStepComponent } = useAuth()

const username = ref('')

const message = ref('')

const next = async () => {
  setStepComponent(SignupStepTwo)
}
</script>

<template>
  <div class="w-full text-lg">
    <div class="w-full mt-5 mr-auto lg:ml-auto px-2 md:w-[360px]">
      <div class="mt-5 relative text-3xl font-bold text-heading">Account erstellen</div>
      <div class="mt-1 relative text-lg text-gray-600 dark:text-gray-300">Wähle einen Benutzernamen</div>

      <div class="mt-12 relative">
        <Input type="email" ref="mailInputRef" placeholder="@Universum_123" v-model="username" autofocus />
        <p class="mt-3 text-gray-500 dark:text-gray-300">https://puzzle.social/@{{ username }}</p>
      </div>


      <div class="mt-6 h-8" v-if="message">
        <span class="text-gray-700">{{ message }}</span>
      </div>
      <div class="mt-7">
        <Button @click="next" class="!px-7">Weiter</button>
      </div>
    </div>
  </div>

</template>