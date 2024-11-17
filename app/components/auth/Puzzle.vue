<script setup lang="ts">
import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';

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
}
</script>

<template>
  <img src="../../assets/pp.png" class="w-66 mt-2">
</template>