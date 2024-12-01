<template>
  <div>
    <div class="mt-7 relative text-3xl font-bold text-heading">{{ $t('login.title') }}</div>
    <div class="mt-1 relative text-lg text-gray-600 dark:text-gray-400">{{ $t('login.subtitle') }}</div>
    <table class="mt-9">
      <tbody>
        <tr>
          <td class="hidden md:table-cell">
            <label for="email" class="text-right mr-2.5">{{ $t('login.email') }}</label>
          </td>
          <td>
            <Input type="email" ref="mailInputRef" :placeholder="$t('signup.email')" v-model="credentials.email"
              autofocus />
          </td>
        </tr>
        <tr>
          <td class="pt-3.5 hidden md:table-cell">
            <label for="email" class="text-right mr-2.5">{{ $t('login.password') }}</label>
          </td>
          <td class="pt-3.5">
            <Input type="password" :placeholder="$t('signup.password')" v-model="credentials.password"
              @keydown.enter="signIn" />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-6 h-8" v-if="message">
      <span class="text-gray-700">{{ message }}</span>
    </div>
    <div class="mt-7">
      <Button @click="signIn" class="!px-8">{{ $t('login.button') }}</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import Loggedin from "./Loggedin.vue"

const { setStepComponent } = useSignup()
const supabase = useSupabaseClient()

const credentials = reactive({
  email: '',
  password: ''
})

const message = ref('')

const signIn = async () => {
  message.value = ''
  const { error } = await supabase.auth.signInWithPassword(credentials)
  if (error) message.value = error.message
  else setStepComponent(Loggedin)
}
</script>
