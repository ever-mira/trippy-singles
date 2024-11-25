<template>
  <Page>
    <div class="flex flex-col lg:flex-row justify-between mt-24 lg:mt-44 md:mx-auto min-h-74">

      <Entry />

      <div class="md:ml-0 w-87% md:w-60% mt-10 lg:mt-0">
        <transition name="stepChange" mode="out-in">
          <component :is="stepComponent"></component>
        </transition>
      </div>
    </div>

    <div class="mt-10 lg:mt-20 mx-auto">
      <UserList class="ml-5 md:ml-7" />
    </div>

    </ Page>
</template>


<script setup lang="ts">
import Entry from '../components/app/Entry.vue'
import UserList from '../components/user/UserList.vue'

const { stepComponent } = useSignup()

definePageMeta({
  auth: false,
})
</script>


<style>
.stepChange-leave-active {
  transition: all 0.2s ease;
}

.stepChange-enter-active {
  transition: all 0.2s ease;
}

.stepChange-leave-to {
  opacity: 0;
  transform: translateX(-4px);
}

.stepChange-enter-from {
  opacity: 0;
  transform: translateX(4px);
}
</style>