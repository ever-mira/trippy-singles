<template>

  <div class="flex h-5 flex-wrap justify-between items-center mx-auto">

    <div class="flex items-center cursor-pointer">
      <AppTitle class="md:hidden" />
    </div>

    <div class="hidden lg:flex w-full lg:w-auto justify-between items-center">

    </div>

    <div class="flex items-center">



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

      <Button color="transparent" @click="toggleSidebar" class="block !px-6 -mr-4 z-30">
        <svg class="w-6.5 h-6.5 text-gray-600 dark:text-gray-300 -mt-.5" fill="currentColor" viewBox="0 0 20 20"
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
import useAuth from '../../service/auth'
import Puzzle from "../auth/Puzzle.vue";
import Login from "../auth/Login.vue";

const { username } = useUser()

const { toggleSidebar } = useApp()

</script>
