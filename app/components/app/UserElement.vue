<template>
  <div>
    <NuxtLink :to="`/@${username}`" @click="delayHideSidebar">
      <div class="flex mt-5.5">
        <div class="flex-1">

          <AvatarRoot>
            <AvatarImage :src="avatar_url || ''" class="w-11 rounded-full" />
            <AvatarFallback>
              <img src="../../assets/avatar.jpg" class="w-11 rounded-full" />
            </AvatarFallback>
          </AvatarRoot>

        </div>
        <div class="flex flex-col flex-grow">
          <div class="text-md font-medium leading-none">
            {{ displayname }}
          </div>
          <div>
            @{{ username }}
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>


<script setup lang="ts">
const { username, displayname, avatar_url } = useUser()
const { delayHideSidebar } = useApp()
</script>
