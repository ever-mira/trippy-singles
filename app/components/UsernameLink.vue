<template>
  <NuxtLink :to="`/@${props.userName}`" class="text-blue-600 hover:text-blue-500">
    {{ props.userName }}
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  userName: string,
}

const props = defineProps<Props>()
</script>