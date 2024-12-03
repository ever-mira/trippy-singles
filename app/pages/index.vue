<template>
  <Page>
    <div class="flex flex-col lg:flex-row justify-between mt-24 lg:mt-29 md:mx-auto min-h-74">

      <Entry />

      <div class="md:ml-0 w-87% md:w-60% lg:w-46% xl:w-60% mt-2">
        <Stepper />
      </div>
    </div>

    <div class="mt-10 lg:mt-20 mx-auto">
      <UserList class="ml-6" />
    </div>

    </ Page>
</template>


<script setup lang="ts">
import Entry from '../components/app/Entry.vue'
import Stepper from '../components/app/Stepper.vue'
import UserList from '../components/user/UserList.vue'

definePageMeta({
  auth: false,
})
</script>


<style></style>