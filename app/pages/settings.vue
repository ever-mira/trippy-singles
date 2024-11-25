<template>
  <Page>
    <Heading>
      {{ $t('settings.title') }}
      <template v-slot:subtitle>
        {{ $t('settings.subtitle') }}
      </template>
    </Heading>

    <div class="py-10 lg:py-15 mx-auto">

      <p class="block mt-19 text-2xl leading-8">
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
  </Page>

</template>


<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const { showModal } = useModal()

const deleteAccountClick = () => {
  showModal(t('settings.delete_account.confirm'), true, yesClicked)
}

const yesClicked = () => {
}

</script>


<style></style>
