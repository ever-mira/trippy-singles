<template>
  <div class="w-full text-lg">
    <div class="w-full mt-5 px-2 md:w-[360px]">
      <div class="mt-5 relative text-3xl font-bold text-heading">{{ displayname }}</div>

      <div class="mt-1 relative text-lg text-gray-600 dark:text-gray-400">{{ $t('signup.last_step_subtitle') }}</div>

      <div class="mt-7 relative">
        <span class="hidden md:inline">{{ $t('signup.email') }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><Input
          type="email" ref="mailInputRef" :placeholder="$t('signup.email')" v-model="credentials.email" autofocus />
      </div>

      <div class="mt-3.5 relative">
        <span class="hidden md:inline">{{ $t('signup.password') }}&nbsp;&nbsp;</span><Input type="password"
          :placeholder="$t('signup.password')" v-model="credentials.password" autofocus @keydown.enter="signUp" />
      </div>

      <div class="mt-6 h-8" v-if="message">
        <span class="text-gray-700">{{ message }}</span>
      </div>
      <div class="mt-7">
        <Button @click="signUp">{{ $t('signup.create_account') }}</button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import Picture from './Picture.vue'

const { setStepComponent, username, displayname } = useSignup()
const supabase = useSupabaseClient()

const credentials = reactive({
  email: '',
  password: ''
})

const message = ref('')

const signUp = async () => {
  message.value = ''

  try {
    const signupData = {
      ...credentials,
      username: username.value,
      displayname: displayname.value
    }

    const result = await $fetch<{ success: boolean }>('/api/signup', {
      method: 'POST',
      body: signupData
    })

    if (result.success) {
      await supabase.auth.signInWithPassword(credentials)

      setStepComponent(Picture)
    }

  } catch (error: any) {
    message.value = error.statusMessage
  }
}
</script>