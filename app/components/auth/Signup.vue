<template>
  <div class="w-full text-lg">
    <div class="w-full mt-5 px-2 md:w-[360px]">
      <div class="mt-5 relative text-3xl font-bold text-heading">Account erstellen</div>
      <div class="mt-1 relative text-lg text-gray-600 dark:text-gray-400">Login-Daten festlegen</div>

      <div class="mt-7 relative">
        <Input type="email" ref="mailInputRef" placeholder="Email" v-model="credentials.email" autofocus />
      </div>

      <div class="mt-4 relative">
        <Input type="password" placeholder="Passwort" v-model="credentials.password" autofocus
          @keydown.enter="signUp" />
      </div>

      <div class="mt-6 h-8" v-if="message">
        <span class="text-gray-700">{{ message }}</span>
      </div>
      <div class="mt-7">
        <Button @click="signUp">Account erstellen</button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import useAuth from '../../service/auth'
import Picture from './Picture.vue';

const { setStepComponent } = useAuth()

const supabase = useSupabaseClient()

const credentials = reactive({
  email: '',
  password: ''
})

const message = ref('')

const signUp = async () => {
  message.value = ''
  const { data, error } = await supabase.auth.signUp(credentials)
  if (error) message.value = error.message
  else setStepComponent(Picture)
}
</script>