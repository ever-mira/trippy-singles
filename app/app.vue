<template>
  <div class="relative min-h-screen h-auto overflow-hidden">
    <NuxtLoadingIndicator />
    <aside class="fixed top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-black bg-opacity-97">
      <AppSidebar />
    </aside>
    <main class="sm:ml-64">
      <header>
        <nav class="px-4 lg:px-6 py-1.5">
          <AppHeader />
        </nav>
      </header>

      <main class="w-full pt-12 px-4 lg:px-6 mx-auto">
        <NuxtPage />
      </main>

      <footer class="absolute bottom-0 px-4 lg:px-6 py-1">
        <AppFooter />
      </footer>
    </main>

    <MobileMenu />

    <Modal />

  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/app/AppHeader.vue'
import AppFooter from './components/app/AppFooter.vue'
import AppSidebar from './components/app/AppSidebar.vue'
import MobileMenu from './components/app/MobileMenu.vue'
import Modal from './components/app/Modal.vue'

useHead({
  title: 'Puzzle Social',
})
</script>

<style>
.page-enter-active {
  transition: opacity 0.27s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
