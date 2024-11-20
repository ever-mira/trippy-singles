<template>
  <div class="text-center mt-30">
    <p class="description">Eingeloggt.</p>
    <p class="description">{{ email }}</p>
    <div class="mt-10">

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
});

const user = useSupabaseUser()

const email = ref<string | undefined>('')

watch(user, () => {
  if (user.value) {
    email.value = user.value.email
  }
}, { immediate: true })

</script>