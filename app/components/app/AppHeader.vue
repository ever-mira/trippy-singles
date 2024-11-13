<template>

  <div class="flex flex-wrap justify-between items-center mx-auto">

    <div class="flex items-center cursor-pointer">
      <NuxtLink to="/" class="text-indigo-700 dark:text-orange-300 text-[1.6rem] font-semibold">
        {{ $t('app.title') }}
      </NuxtLink>
    </div>

    <div class="hidden lg:flex w-full lg:w-auto justify-between items-center">
      <ul class="flex flex-col lg:flex-row mt-4 lg:mt-0 lg:space-x-8 font-medium">
        <li>
          <Link to="/people">
          {{ $t('app.menu.people') }}
          </Link>
        </li>
        <li>
          <Link to="/events">
          {{ $t('app.menu.events') }}
          </Link>
        </li>
        <li>
          <Link to="/locations">
          {{ $t('app.menu.locations') }}
          </Link>
        </li>
      </ul>
    </div>

    <div class="flex items-center">

      <ToggleDark class="mr-5 md:mr-6" />

      <LanguageDropdown />

      <div class="hidden lg:flex items-center" v-if="user">

        <Button to="/settings" color="transparent" class="!px-4 !text-[1rem]">
          ⚙️
        </Button>

        <Button :to="'/account/'" color="transparent" class="!text-[1rem]">
          {{ user?.email }}
        </Button>

        <Button color="indigo" @click="logout" class="!px-6.5">
          {{ $t('app.logout') }}
        </Button>
      </div>

      <div class="hidden lg:flex" v-if="!user">

        <Button to="/login" color="transparent">
          {{ $t('app.login') }}
        </Button>

      </div>

      <Button color="transparent" @click="showMobileMenu" class="block lg:hidden !px-6 -mr-4">
        <svg class="w-6 h-6 text-gray-500 dark:text-gray-300 -mt-.5" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </Button>

    </div>

  </div>

</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import useApp from './../../service/app'
import LanguageDropdown from '../language/LanguageDropdown.vue'
import ToggleDark from './DarkToggle.vue'

const router = useRouter()

const user: Ref = useSupabaseUser()

const { showMobileMenu } = useApp()

const logout = () => {
  router.push({ path: '/' })
}
</script>
