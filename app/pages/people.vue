<template>
  <Page>
    <Heading>
      {{ $t('pages.people.title') }}
      <template v-slot:subtitle>
        {{ $t('pages.people.subtitle') }}
      </template>
    </Heading>

    <UserExplore />

  </Page>
</template>

<script setup lang="ts">
import UserExplore from '../components/user/UserExplore.vue'
</script>

<style></style>
