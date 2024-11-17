<script setup lang="ts">
const supabase = useSupabaseClient()
const email = ref('')

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'https://puzzle.codes/confirm',
    }
  })
  if (error) console.log(error)
}
</script>

<template>
  <div class="text-center mt-40">

    <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
      {{ $t('login.title') }}
    </h1>

    <br><br>

    <p class="description">Sign in via magic link with your email below.</p>

    <div class="mt-10">
      <Input v-model="email" type="email" />

      <Button color="indigo" @click="signInWithOtp" class="ml-4">
        Send link
      </Button>

    </div>

  </div>
</template>