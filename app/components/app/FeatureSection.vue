<template>
  <div class="mt-21">
    <span class="text-2xl">{{ t("remember") }}</span>
    <div class="mt-1 text-xl">
      {{ t("remember_description") }}
    </div>
  </div>
  <div class="text-3xl mt-7">🍄</div>

  <div class="grid grid-cols-1 lg:grid-cols-3 mt-19 gap-4 w-full xl:w-90% 2xl:w-80% 3xl:w-75%">
    <FeatureBox>
      {{ t("feature_visions") }}
      <template v-slot:content> {{ t("feature_visions_content") }} </template>
    </FeatureBox>

    <FeatureBox>
      {{ t("feature_insights") }}
      <template v-slot:content> {{ t("feature_insights_content") }} </template>
    </FeatureBox>

    <FeatureBox>
      {{ t("feature_friends") }}
      <template v-slot:content> {{ t("feature_friends_content") }} </template>
    </FeatureBox>
  </div>

  <div class="mt-19">
    <h2 class="text-2xl">{{ t("mutual") }}</h2>
    <span class="text-lg text-gray-700 dark:text-gray-400">
      {{ t("mutual_description") }}
      <br />
      <br />
      {{ t("real_magic") }}
      <!-- <span class="text-green-700">Diese Momente: how is this even possible?!</span> -->
    </span>
  </div>

  <div class="mt-17 text-xl lg:w-70% xl:w-60% 2xl:w-47% 3xl:w-40%">
    <img src="/assets/wordcloud.png" />
  </div>

  <!-- <img src="/assets/even_possible.png" class="w-100 mt-4" /> -->

  <div class="mt-19 mb-11">
    <h2 class="text-2xl">{{ t("special_person") }}</h2>
    <span class="text-lg text-gray-700 dark:text-gray-400">{{ t("special_person_description") }}</span>
  </div>

  <Puzzle class="!ml-0" />

  <div class="mt-19 mb-11">
    <h2 class="text-2xl">{{ t("experiences_title") }}</h2>
    <span class="text-lg text-gray-700 dark:text-gray-400">{{ t("experiences_description") }}</span>
  </div>

  <Button color="indigo" to="/reports" class="!px-8">{{ t("trip_reports") }}</Button>

  <div class="h-30"></div>
</template>

<script setup lang="ts">
import Puzzle from "../steps/Puzzle.vue"
const { t } = useI18n()
</script>


<style></style>


<i18n lang="json">{
  "de": {
    "remember": "Erinnern",
    "remember_description": "Die vergessenen Trips ans Licht zu holen, erhöht unser Bewusstsein, und erschafft eine Realität, in der Magie real ist.",
    "feature_visions": "Visionen erschaffen",
    "feature_visions_content": "Realitäten wahr werden lassen",
    "feature_insights": "Erkenntnisse teilen",
    "feature_insights_content": "Erfahrungen und Wissen tauschen",
    "feature_friends": "Freunde finden",
    "feature_friends_content": "Wer hat ähnliches erlebt?",
    "mutual": "Gegenseitig",
    "mutual_description": "Durch das Trip-Berichte schreiben, können wir uns gegenseitig an die Momente erinnern, die wir schon längst vergessen hatten.",
    "real_magic": "Real Magic.",
    "special_person": "Ein besonderer Mensch.",
    "special_person_description": "Wir können Menschen finden, die wir in der Zukunft bereits getroffen haben.",
    "experiences_title": "Was hast du schon alles erlebt, und längst wieder vergessen?",
    "experiences_description": "Teile deine schönsten Erfahrungen mit Psychedelica.",
    "trip_reports": "Trip-Berichte"
  },
  "en": {
    "remember": "Remember",
    "remember_description": "Bringing forgotten trips into the light expands our consciousness and creates a reality where magic is real.",
    "feature_visions": "Creating Visions",
    "feature_visions_content": "Making realities come true",
    "feature_insights": "Sharing Insights",
    "feature_insights_content": "Exchanging experiences and knowledge",
    "feature_friends": "Finding Friends",
    "feature_friends_content": "Who has experienced something similar?",
    "mutual": "Mutual",
    "mutual_description": "By writing trip reports, we can help each other remember the moments we have experienced but forgotton.",
    "real_magic": "Real Magic.",
    "special_person": "A special person.",
    "special_person_description": "We can find people we have already met in the future.",
    "experiences_title": "What have you experienced and long since forgotten?",
    "experiences_description": "Share your most beautiful experiences with psychedelics.",
    "trip_reports": "Trip-Reports"
  }
}</i18n>