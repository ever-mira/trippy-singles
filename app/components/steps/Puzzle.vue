<template>
  <div class="w-74 lg:w-74.5 md:-ml-11 mt-2">
    <img src="../../assets/puzzles.png" />
    <div class="text-center text-lg -mt-1.5 lg:-mt-3">{{ t("find_me_find_yourself") }}</div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="json">{
  "de": {
    "find_me_find_yourself": "Finde Mich. Finde Dich."
  },
  "en": {
    "find_me_find_yourself": "Find me. Find yourself."
  }
}</i18n>