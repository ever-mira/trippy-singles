<template>
  <Button @click="goBack" class="!px-6.5 mt-19 lg:mt-27" color="indigo">
    <ArrowLeftIcon class="inline w-4 mr-1.5 -ml-2.2 -mt.7" />{{ $t("profile.back") }}
  </Button>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/solid"

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped></style>
