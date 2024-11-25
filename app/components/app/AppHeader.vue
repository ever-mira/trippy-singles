<template>
  <div
    class="absolute px-4 lg:px-6 py-.8 z-10 w-full bg-white dark:bg-black bg-opacity-90 lg:hidden transition-transform duration-300"
    :class="isHeaderVisible ? 'translate-y-0' : '-translate-y-full'">

    <div class="flex flex-wrap justify-between items-center mx-auto">

      <div class="flex items-center cursor-pointer">
        <AppTitle class="lg:hidden" />
      </div>

      <div class="hidden lg:flex w-full lg:w-auto justify-between items-center">
      </div>

      <div class="flex items-center">

        <Button color="transparent" @click="toggleSidebar" class="block !px-6 -mr-4 z-30">
          <svg class="w-6.5 h-6.5 text-gray-600 dark:text-gray-300 -mt-.5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
          </svg>
        </Button>

      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
const { toggleSidebar, isHeaderVisible } = useApp()
</script>
