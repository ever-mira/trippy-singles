<template>
  <div class="relative min-h-screen h-auto overflow-hidden">
    <NuxtLoadingIndicator />
    <aside
      class="hidden lg:block fixed top-0 left-0 z-40 w-70 md:w-64 h-screen bg-white dark:bg-black border-r border-gray-500 lg:border-r-0"
      :class="{ '!block': isSidebarVisible }">
      <AppSidebar />
    </aside>
    <main class="lg:ml-64">
      <!-- <header>
        <nav class="px-4 lg:px-6 py-1.5">
          <AppHeader />
        </nav>
      </header> -->

      <main class="">
        <!-- pt-12 pl-4 lg:pl-6 -->

        <!--  -->
        <div class="relative h-full w-full">
          <NuxtPage />
        </div>
      </main>

      <footer class="absolute bottom-0 px-4 lg:px-6 py-1">
        <AppFooter />
      </footer>
    </main>

    <Modal />

  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/app/AppHeader.vue'
import AppFooter from './components/app/AppFooter.vue'
import AppSidebar from './components/app/AppSidebar.vue'

import Modal from './components/app/Modal.vue'

useHead({
  title: 'Puzzle Social',
})

const { isSidebarVisible } = useApp()
</script>

<style>
.page-enter-active,
.page-leave-active {
  position: absolute;
  height: 100%;
  width: 100%;
  transition: opacity 0.17s ease;
}

.page-enter-from {
  opacity: 0;
}

.page-leave-to {
  opacity: 0;
}
</style>
