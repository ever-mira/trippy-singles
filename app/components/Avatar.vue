<template>
  <NuxtLink :to="`/@${props.userName}`">
    <NuxtImg :src="props.avatarUrl || ''" class="rounded-full shadow-md" height="70" width="70"
      fit="cover" v-if="props.avatarUrl" />
        <img src="../assets/avatar.jpg" class="rounded-full shadow-md" v-else />
    </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  userName: string,
  avatarUrl: string | null,
}

const props = defineProps<Props>()
</script>