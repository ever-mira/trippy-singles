<template>
  <div class="py-10 lg:py-15 max-w-screen-lg mx-auto">
    <h1 class="text-4xl font-bold tracking-tight">
      {{ $t('settings.title') }}
    </h1>
    <p class="mt-6 text-lg leading-8 text-sub dark:text-sub-dark">
      {{ $t('settings.subtitle') }}
    </p>

    <p class="block mt-22 text-2xl leading-8">
      {{ $t('settings.delete_account.title') }}
    </p>

    <Button color="red" @click="deleteAccountClick" class="mt-4 !px-6.5">
      {{ $t('settings.delete_account.button') }}
    </Button>

    <p class="block mt-22 text-2xl leading-8">
      {{ $t('settings.language') }}
    </p>
    <LanguageDropdown class="mt-3" />

  </div>
</template>


<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import useApp from '~/service/app'
const { t } = useI18n()

const { showModal } = useApp()

const deleteAccountClick = () => {
  showModal(t('settings.delete_account.confirm'), true, yesClicked)
}

const yesClicked = () => {
}

</script>


<style></style>
