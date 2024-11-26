<template>
  <div
    class="fixed lg:block top-0 left-0 z-40 w-70 lg:w-67 px-4 py-2.7 z-30 h-screen bg-white dark:bg-black lg:border-r border-gray-300 dark:border-gray-800 lg:border-gray-100 dark:lg:border-gray-900 shadow-lg lg:shadow-none transition-all duration-200 ease-out"
    :class="isSidebarVisible ? 'opacity-100 translate-x-0 !block' : 'opacity-0 !-z-10 lg:!z-30 lg:opacity-100 -translate-x-7 lg:translate-x-0'">

    <AppTitle />

    <UserPanel v-if="user" />

    <div>
      <NavLink to="/" class="mt-6">
        <i class="fa-solid fa-house text-sky-600 mr-4"></i>{{ $t('menu.start') }}
      </NavLink>

      <NavLink to="/people">
        <i class="fa-solid fa-user-group text-sky-600 mr-4"></i>{{ $t('menu.people') }}
      </NavLink>

      <NavLink to="/places">
        <i class="fa-solid fa-map-location-dot text-sky-600 mr-4"></i>{{ $t('menu.places') }}
      </NavLink>

      <NavLink to="/events">
        <i class="fa-solid fa-calendar text-sky-600 mr-4"></i>{{ $t('menu.events') }}
      </NavLink>

      <NavLink to="/exchange">
        <i class="fa-solid fa-share-nodes text-sky-600 mr-4"></i>{{ $t('menu.exchange') }}
      </NavLink>

      <NavLink to="/chat">
        <i class="fa-solid fa-comments text-sky-600 mr-4"></i>{{ $t('menu.chat') }}
      </NavLink>
    </div>

    <div class="hidden mt-5" v-if="!user">
      <Button color="indigo" @click="login">
        {{ $t('app.login') }}
      </Button>
    </div>

    <div class="border-t border-gray-200 dark:border-gray-700 mt-7 pt-1.5" v-if="user">
      <NavLink to="/mailbox">
        <i class="fa-solid fa-envelope text-sky-600 mr-4"></i>{{ $t('app.mailbox') }}
      </NavLink>
      <NavLink to="/settings">
        <i class="fa-solid fa-gear text-sky-600 mr-4"></i>{{ $t('app.settings') }}
      </NavLink>
      <div @click="logout" class="px-4.5 mt-4">
        <span class="text-blue-7 dark:text-blue-6 cursor-pointer">{{ $t('app.logout') }}</span>
      </div>
    </div>

    <div class="flex mt-6 pt-5 border-t border-gray-200 dark:border-gray-700 ">
      <div class="">
        <LanguageDropdown />
      </div>
      <div class="px-9 py-1.4">
        <ToggleDark />
      </div>
    </div>
  </div>
  <div class="hidden fixed top-0 left-0 h-screen w-screen z-20 cursor-pointer bg-gray-100 dark:bg-gray-900 opacity-30"
    :class="{ '!block': isSidebarVisible }" @click="hideSidebar"></div>
</template>


<script setup lang="ts">
import AppTitle from './AppTitle.vue'
import UserPanel from './UserPanel.vue'
import NavLink from './NavLink.vue'
import LanguageDropdown from '../language/LanguageDropdown.vue'
import ToggleDark from './DarkToggle.vue'
import Puzzle from "../steps/Puzzle.vue"
import Login from "../steps/Login.vue"

const router = useRouter()
const user: Ref = useSupabaseUser()
const supabase = useSupabaseClient()
const { setStepComponent, reset } = useSignup()
const { isSidebarVisible, hideSidebar } = useApp()

const logout = async () => {
  await supabase.auth.signOut()
  reset()
  router.push({ path: '/' })
  setStepComponent(Puzzle)
  hideSidebar()
}

const login = async () => {
  router.push({ path: '/' })
  setStepComponent(Login)
  hideSidebar()
}
</script>
