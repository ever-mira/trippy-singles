<template>
  <div class="p-5">
    <div>
      <AppTitle />

      <UserElement v-if="user" />

      <div class="hidden mt-5" v-if="!user">
        <Button color="indigo" @click="login">
          {{ $t('app.login') }}
        </Button>
      </div>

      <NavLink to="/" class="mt-5">
        Startseite
      </NavLink>

      <NavLink to="/people">
        Menschen
      </NavLink>

      <NavLink to="/places">
        Orte
      </NavLink>

      <NavLink to="/events">
        Veranstaltungen
      </NavLink>

      <NavLink to="/exchange">
        Tauschen
      </NavLink>

      <NavLink to="/chat">
        Chat
      </NavLink>

      <NavLink to="/favorites">
        Favorites
      </NavLink>

    </div>

    <div class="border-t mt-5 pt-.5">

      <div class="items-center" v-if="user">
        <NavLink to="/settings">
          Einstellungen
        </NavLink>
        <Button color="indigo" @click="logout" class="!px-6.5 ml-4 mt-1.5">
          {{ $t('app.logout') }}
        </Button>
      </div>

    </div>

    <div class="p-4 mt-5">
      <ToggleDark />

      <LanguageDropdown class="mt-4" />
    </div>


  </div>
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


const user: Ref = useSupabaseUser()
const supabase = useSupabaseClient()

const { username, displayname, avatar_url } = useUser()
const { setStepComponent, reset } = useAuth()
const router = useRouter()

const logout = async () => {
  await supabase.auth.signOut()
  reset()
  router.push({ path: '/' })
  setStepComponent(Puzzle)
}

const login = async () => {
  router.push({ path: '/' })
  setStepComponent(Login)
}
</script>
