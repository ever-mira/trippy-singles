<template>
  <div
    class="lg:block fixed top-0 left-0 z-40 w-70 lg:w-67 z-30 h-screen bg-white dark:bg-black lg:border-r border-gray-300 dark:border-gray-800 lg:border-gray-100 dark:lg:border-gray-900 px-4 py-3.3 shadow-lg lg:shadow-none transition-all duration-200 ease-out"
    :class="isSidebarVisible ? 'opacity-100 translate-x-0 !block' : 'opacity-0 !-z-10 lg:!z-30 lg:opacity-100 -translate-x-7 lg:translate-x-0'">
    <div>
      <AppTitle />

      <UserElement v-if="user" />

      <div class="hidden mt-5" v-if="!user">
        <Button color="indigo" @click="login">
          {{ $t('app.login') }}
        </Button>
      </div>

      <NavLink to="/" class="mt-6">
        <i class="fa-solid fa-house text-sky-600 mr-4" style=""></i>Startseite
      </NavLink>

      <NavLink to="/people">
        <i class="fa-solid fa-user-group text-sky-600 mr-4"></i>Menschen
      </NavLink>

      <NavLink to="/places">
        <i class="fa-solid fa-map-location-dot text-sky-600 mr-4"></i>Orte
      </NavLink>

      <NavLink to="/events">
        <i class="fa-solid fa-calendar text-sky-600 mr-4"></i>Veranstaltungen
      </NavLink>

      <NavLink to="/exchange">
        <i class="fa-solid fa-share-nodes text-sky-600 mr-4"></i>Tauschen
      </NavLink>

      <NavLink to="/chat">
        <i class="fa-solid fa-comments text-sky-600 mr-4"></i>Chat
      </NavLink>

    </div>

    <div class="border-t border-gray-200 dark:border-gray-700 mt-7 pt-1.5">
      <div v-if="user">
        <NavLink to="/settings">
          <i class="fa-solid fa-gear text-sky-600 mr-4"></i>Einstellungen
        </NavLink>
        <Button color="indigo" @click="logout" class="!px-6.5 mt-4">
          {{ $t('app.logout') }}
        </Button>
      </div>
    </div>

    <div class="mt-5">
      <ToggleDark />

      <LanguageDropdown class="mt-5" />
    </div>
  </div>
  <div class="hidden fixed top-0 left-0 h-screen w-screen z-20 cursor-pointer bg-gray-100 dark:bg-gray-900 opacity-30"
    :class="{ '!block': isSidebarVisible }" @click="hideSidebar"></div>
</template>


<script setup lang="ts">
import useAuth from '../../service/auth'
import AppTitle from './AppTitle.vue'
import UserElement from './UserElement.vue'
import NavLink from './NavLink.vue'
import LanguageDropdown from '../language/LanguageDropdown.vue'
import ToggleDark from './DarkToggle.vue'
import Puzzle from "../auth/Puzzle.vue";
import Login from "../auth/Login.vue";

const router = useRouter()

const user: Ref = useSupabaseUser()
const supabase = useSupabaseClient()

const { setStepComponent, reset } = useAuth()
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
