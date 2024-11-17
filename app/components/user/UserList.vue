<template>
  <div>
    <h1>Liste aller Nutzer</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.id }}
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">

const supabase = useSupabaseClient()

const { data: users, error } = await useAsyncData('users', async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('id')

  if (error) {
    throw new Error('Fehler beim Laden der User: ' + error.message)
  }

  return data
})

</script>
