<template>

  <div>

    <AppLogo />

    <div class="flex items-center justify-center gap-x-2 mt-11 md:mt-13" v-if="!user">

      <Button color="red" to="/login" class="!px-8">
        {{ $t('app.start') }}
      </Button>

      <Button color="transparent" to="/login" class="!px-7">
        {{ $t('app.login') }}
      </Button>

    </div>

    <div class="flex items-center justify-center mt-11 md:mt-10 gap-x-6" v-if="user">
      <Button color="indigo" to="/account/" class="!px-6.5">
        {{ $t('app.your_profile') }}
      </Button>
    </div>

  </div>
</template>


<script setup lang="ts">
import AppLogo from '../components/app/AppLogo.vue'

definePageMeta({
  auth: false,
});

const user: Ref = useSupabaseUser()

</script>
