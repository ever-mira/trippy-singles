<template>
  <div
    class="relative overflow-hidden max-h-screen 3xl:max-w-90vw 4xl:max-w-82vw mx-auto bg-white dark:bg-[#121212] lg:dark:bg-black z-0">
    <NuxtLoadingIndicator />

    <aside>
      <Sidebar />
    </aside>

    <div class="lg:ml-67">
      <header>
        <AppHeader />
      </header>

      <main class="relative h-full w-full min-h-screen">
        <NuxtPage />
        <FloatingOrbs />
      </main>
    </div>

    <Modal />
    <ImageModal />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/app/AppHeader.vue'
import Sidebar from './components/app/Sidebar.vue'
import Modal from './components/app/Modal.vue'
import ImageModal from './components/app/ImageModal.vue'
import FloatingOrbs from './components/app/FloatingOrbs.vue'

useHead({
  title: 'Trippy',
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  position: absolute;
  height: 100%;
  width: 100%;
  transition: opacity 0s ease;
}

.page-enter-from {
  opacity: 0;
}

.page-leave-to {
  opacity: 0;
}
</style>
