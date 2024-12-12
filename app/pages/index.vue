<template>
  <Page>
    <div class="flex flex-col lg:flex-row justify-between mt-24 lg:mt-29 md:mx-auto min-h-74">

      <Entry />

      <div class="md:w-60% w-87% lg:w-46% xl:w-60% mt-2">
        <Stepper />
      </div>
    </div>

    <NuxtLink to="/about" class="md:absolute flex flex-col right-0 top-29% text-right pr-4 text-gray-900">
      <div class="text-xl">
        <SparklesIcon class="inline w-7" />
      </div>
      <div class="text-2xl">
        Open Source
      </div>
      <div class="text-xl">
        Built by the community
      </div>
      <div class="text-xl">
        Built by you.
        <CursorArrowRippleIcon class="inline w-7 mt-1" />
      </div>
      <div class="text-sm">
      </div>
    </NuxtLink>

    <div class="mt-9 lg:mt-20 mx-auto">
      <UserList class="ml-3 lg:ml-7" />
    </div>

    </ Page>
</template>


<script setup lang="ts">
import Entry from '../components/app/Entry.vue'
import Stepper from '../components/app/Stepper.vue'
import UserList from '../components/user/UserList.vue'
import { SparklesIcon } from '@heroicons/vue/24/solid'
import { CursorArrowRippleIcon } from '@heroicons/vue/24/solid'

definePageMeta({
  auth: false,
})
</script>


<style></style>