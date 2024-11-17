<template>
  <div class="w-full text-lg -mt-5">
    <div class="w-full px-2 md:w-[360px]">
      <div class="mt-9 relative text-3xl font-bold text-heading">{{ $t('login.title') }}</div>
      <div class="mt-1 relative text-lg text-gray-600 dark:text-gray-400">Welcome at Puzzle</div>
      <div class="mt-9 relative">
        <Input type="email" ref="mailInputRef" placeholder="Email" v-model="credentials.email" autofocus />
      </div>

      <div class="mt-4 relative">
        <Input type="password" placeholder="Passwort" v-model="credentials.password" @keydown.enter="signIn" />
      </div>

      <div class="mt-6 h-8" v-if="message">
        <span class="text-gray-700">{{ message }}</span>
      </div>
      <div class="mt-7">
        <Button @click="signIn" class="!px-8">Login</button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import useAuth from '../../service/auth'
import Loggedin from "./Loggedin.vue";

const { setStepComponent } = useAuth()

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
