<template>

  <div class="flex flex-wrap justify-between items-center mx-auto">

    <div class="flex items-center cursor-pointer">
      <NuxtLink to="/" class="text-sky-600 dark:text-orange-300 text-[1.6rem] font-semibold"
        @click="setStepComponent(Puzzle)">
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

      <!-- <DropdownMenuRoot :open="false">
        <DropdownMenuTrigger
          class="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-grass11 bg-white shadow-[0_2px_10px] shadow-blackA7 outline-none hover:bg-green3 focus:shadow-[0_0_0_2px] focus:shadow-black"
          aria-label="Customise options">
          Menu
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent
            class="min-w-[220px] outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            :side-offset="5">
            <DropdownMenuItem value="New Tab"
              class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100 cursor-pointer"
              @click="">
              New Tab
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot> -->

      <div class="hidden lg:flex items-center" v-if="user">

        <Button to="/settings" color="transparent" class="!px-4 !text-[1rem]">
          ⚙️
        </Button>

        <Button :to="`/@${username}`" color="transparent" class="!text-[1rem]">
          {{ username }}
        </Button>

        <Button color="indigo" @click="logout" class="!px-6.5">
          {{ $t('app.logout') }}
        </Button>
      </div>

      <div class="hidden lg:flex" v-if="!user">

        <Button color="transparent" @click="login">
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

import useAuth from '../../service/auth'
import Puzzle from "../auth/Puzzle.vue";
import Login from "../auth/Login.vue";

const { setStepComponent } = useAuth()
const { username } = useUser()

const router = useRouter()

const user: Ref = useSupabaseUser()
const supabase = useSupabaseClient()

const { showMobileMenu } = useApp()

const logout = async () => {
  await supabase.auth.signOut()
  router.push({ path: '/' })
  setStepComponent(Puzzle)
}

const login = async () => {
  router.push({ path: '/' })
  setStepComponent(Login)
}
</script>
