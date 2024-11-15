<template>

  <div>

    <!-- two columns that are full width with justify between and that are stacked in mobile -->
    <div class="flex flex-col md:flex-row justify-between m-40 mx-auto">
      <div class="flex-1">
        <img src="../assets/entry2.png">
        <div class="ml-11 mt-2 text-lg">Finde neue Freunde und erforsche das Universum.</div>
        <div class="ml-11 mt-8">
          <div v-if="!user">
            <Button color="red" to="/login" class="!px-8">
              {{ $t('app.start') }}
            </Button>

            <Button color="transparent" to="/login" class="!px-7">
              {{ $t('app.login') }}
            </Button>
          </div>
          <div v-if="user">
            <Button color="indigo" to="/account/" class="!px-6.5">
              {{ $t('app.your_profile') }}
            </Button>
          </div>

        </div>

      </div>

      <div class="flex">
        <img src="../assets/pp.jpg" class="mt-13 md:mt-2 w-100">
        <img src="../assets/p.png" class="mt-13 md:mt-2 w-100">
      </div>
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
