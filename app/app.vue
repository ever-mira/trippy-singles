<template>
  <div class="relative min-h-screen h-auto overflow-hidden">
    <NuxtLoadingIndicator />

    <aside>
      <Sidebar />
    </aside>

    <div class="lg:ml-67">
      <header>
        <AppHeader />
      </header>

      <main class="relative h-full w-full">
        <NuxtPage />
      </main>

      <footer class="hidden lg:block absolute bottom-0 px-4 lg:px-6 py-1">
        <AppFooter />
      </footer>
    </div>

    <Modal />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/app/AppHeader.vue'
import AppFooter from './components/app/AppFooter.vue'
import Sidebar from './components/app/Sidebar.vue'
import Modal from './components/app/Modal.vue'

useHead({
  title: 'Puzzle Social',
})
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
