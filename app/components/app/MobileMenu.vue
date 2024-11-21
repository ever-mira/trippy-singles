<template>
  <div v-if="mobileMenuVisible" class="hidden inset-0 z-50 bg-gray-200 bg-opacity-50 flex items-center justify-center"
    :class="{ 'fixed': mobileMenuVisible }">
    <div class="fixed left-0 top-0 bottom-0 z-50 w-80 bg-white dark:bg-black shadow-lg">
      <div class="bg-red-600 dark:bg-indigo-900 text-white py-2 px-4 flex justify-between items-center">
        <RouterLink to="/" class="text-[1.5rem] font-semibold">
          {{ $t('app.title') }}
        </RouterLink>
        <button class="text-white text-3xl" @click="hideMobileMenu">&times;</button>
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import useApp from '../../service/app'

const router = useRouter()
const { mobileMenuVisible, hideMobileMenu } = useApp()

const loggedin = false
const doLogout = () => { }

const logoutClicked = () => {
  doLogout()
  router.push({ path: '/' })
}
</script>