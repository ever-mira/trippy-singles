<template>
  <div>
    <h1 class="text-gray-300 text-lg">Neue Nutzer</h1>
    <div class="flex flex-wrap -ml-3 mt-7 gap-y-3">
      <div v-for="user in users" :key="user.id" class="ml-3">
        <AvatarRoot>
          <AvatarImage :src="user.avatar_url" class="w-14 rounded-full" />
          <AvatarFallback>
            <img src="../../assets/avatar.jpg" class="w-14 rounded-full" />
          </AvatarFallback>
        </AvatarRoot>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { AvatarImage, AvatarRoot } from 'radix-vue'

const supabase = useSupabaseClient()

const { data: users } = await useAsyncData('users', async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, avatar_url')

  if (error) {
    throw new Error('Fehler beim Laden der User: ' + error.message)
  }

  return data
})

</script>
