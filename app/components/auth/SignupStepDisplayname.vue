<template>
  <div class="w-full text-lg">
    <div class="w-full mt-5 px-2 md:w-[360px]">
      <div class="mt-5 relative text-3xl font-bold text-heading">{{ $t('signup.second_step_title') }}</div>
      <div class="mt-1 relative text-lg text-gray-600 dark:text-gray-300">{{ $t('signup.second_step_subtitle') }}</div>

      <div class="mt-12 relative">
        <Input :placeholder="$t('signup.displayname')" v-model="displayname" autofocus
          class="!w-[230px] md:!w-[220px]" />
      </div>

      <div class="mt-8.5">
        <Button @click="next" class="!px-7" :disabled="displayname.length < 3">{{ $t('signup.next') }}</button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import useAuth from '../../service/auth'
import SignupStepLogin from './SignupStepLogin.vue'

const { setStepComponent, displayname } = useAuth()

const next = async () => {
  setStepComponent(SignupStepLogin)
}
</script>