<template>
  <Page>
    <div class="flex flex-col lg:flex-row justify-between mt-24 lg:mt-29 md:mx-auto min-h-74">
      <Entry />

      <div class="md:w-60% w-87% lg:w-46% xl:w-60% mt-2">
        <Stepper />
      </div>
    </div>

    <OpenSourcePanel />

    <div class="mt-9 lg:mt-17 mx-auto">
      <UserList class="ml-3 lg:ml-7" />
    </div>

    <FeatureSection />

    <div class="h-50"></div>
    </ Page>
</template>


<script setup lang="ts">
import Entry from '../components/app/Entry.vue'
import Stepper from '../components/app/Stepper.vue'
import UserList from '../components/user/UserList.vue'
import OpenSourcePanel from '~/components/app/OpenSourcePanel.vue'
import FeatureSection from '~/components/app/FeatureSection.vue'

definePageMeta({
  auth: false,
})
</script>


<style></style>