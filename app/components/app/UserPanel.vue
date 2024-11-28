<template>
  <div
    class="p-2 mt-3.5 border-gray-200 border-1.5 dark:border-gray-800 rounded-xl bg-highlight dark:bg-highlight-dark">
    <NuxtLink :to="`/@${username}`" @click="hideSidebar">
      <div class="flex  gap-2.5">
        <div>

          <AvatarRoot>
            <AvatarImage :src="avatar_url || ''" class="w-11 rounded-full" />
            <AvatarFallback>
              <img src="../../assets/avatar.jpg" class="w-11 rounded-full" />
            </AvatarFallback>
          </AvatarRoot>

        </div>
        <div class="flex flex-col flex-grow pt-1">
          <div class="font-medium leading-none">
            {{ displayname }}
          </div>
          <div class="text-gray-700 dark:text-gray-300 text-sm">
            @{{ username }}
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>


<script setup lang="ts">
const { username, displayname, avatar_url } = useUser()
const { hideSidebar } = useApp()
</script>
