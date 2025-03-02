<template>
  <div class="flex gap-x-4 mt-11 lg:w-65% xl:w-50% 2xl:w-45%">
    <div>
      <h3 class="text-[1.4rem]">
        <BeakerIcon class="inline w-7.1 text-blue-500 dark:text-blue-600 -mt-1.7 mr-3" />{{ t("title") }}
      </h3>

      <span class="block text-lg mt-2">{{ t("description") }}</span><br />
      <NuxtLink to="/reports"
        class="block text-blue-700 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 text-lg -mt-1">
        {{ t("link") }} →
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BeakerIcon } from "@heroicons/vue/24/solid"
const { t } = useI18n()
</script>


<i18n lang="json">{
  "de": {
    "title": "Trip-Berichte",
    "description": "Sich an seine ersten Trips erinnern. Vergessene Magie? Hier kann man seine Erlebnisse beschreiben. Und wir finden uns.",
    "link": "Trip Berichte"
  },
  "en": {
    "title": "Trip Reports",
    "description": "Remember your first trips. Forgotten magic? Here, you can describe your experiences. And we find each other.",
    "link": "Trip Reports"
  }
}</i18n>