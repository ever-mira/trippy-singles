<template>
  <Page>
    <div class="ml-1 xl:ml-4 3xl:ml-7 mt-24 lg:mt-29">
      <div class="flex flex-col md:flex-row min-h-74">
        <Entry class="md:w-55% lg:w-55% xl:w-57% 2xl:w-47% 3xl:w-40%" />
        <Stepper />
      </div>

      <TripReportSection />

      <OpenSourcePanel />

      <UserList class="mt-15 lg:mt-19 mx-auto" />

      <FeatureSection />
    </div>
  </Page>
</template>

<script setup lang="ts">
import Entry from "../components/app/Entry.vue"
import Stepper from "../components/app/Stepper.vue"
import TripReportSection from "../components/app/TripReportSection.vue"
import UserList from "../components/user/UserList.vue"
import OpenSourcePanel from "~/components/app/OpenSourcePanel.vue"
import FeatureSection from "~/components/app/FeatureSection.vue"

definePageMeta({
  auth: false,
})
</script>

<style></style>
