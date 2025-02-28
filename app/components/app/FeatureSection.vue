<template>
  <div class="mt-21">
    <span class="text-2xl">Erinnern</span>
    <div class="mt-1 text-xl">
      Die vergessenen Trips ans Licht zu holen, erhöht unser Bewusstsein, und erschafft eine
      Realität, in der Magie real ist.
    </div>
  </div>
  <div class="text-3xl mt-7">🍄</div>

  <div class="grid grid-cols-1 lg:grid-cols-3 mt-19 gap-4 w-full xl:w-90% 2xl:w-80% 3xl:w-75%">
    <FeatureBox>
      Visionen erschaffen
      <template v-slot:content> Realitäten wahr werden lassen </template>
    </FeatureBox>

    <FeatureBox>
      Erkenntnisse teilen
      <template v-slot:content> Erfahrungen und Wissen tauschen </template>
    </FeatureBox>

    <FeatureBox>
      Freunde finden
      <template v-slot:content> Wer hat ähnliches erlebt? </template>
    </FeatureBox>
  </div>

  <div class="mt-19">
    <h2 class="text-2xl">Gegenseitig</h2>
    <span class="text-lg text-gray-700 dark:text-gray-400">Durch das Trip-Berichte schreiben, können wir uns gegenseitig
      an Momente erinnern, die
      wir erlebt haben.
      <br />
      <br />
      Real Magic
      <!-- <span class="text-green-700">Diese Momente: how is this even possible?!</span> -->
    </span>
  </div>

  <div class="mt-17 text-xl lg:w-70% xl:w-60% 2xl:w-47% 3xl:w-40%">
    <img src="/assets/wordcloud.png" />
  </div>

  <!-- <img src="/assets/even_possible.png" class="w-100 mt-4" /> -->

  <div class="mt-19 mb-11">
    <h2 class="text-2xl">Ein besonderer Mensch.</h2>
    <span class="text-lg text-gray-700 dark:text-gray-400">Wir können Menschen finden, die wir in der Zukunft bereits
      getroffen haben.</span>
  </div>

  <Puzzle class="!ml-0" />

  <div class="mt-19 mb-11">
    <h2 class="text-2xl">Was hast du schon alles erlebt, und längst wieder vergessen?</h2>
    <span class="text-lg text-gray-700 dark:text-gray-400">Teile deine schönsten Erfahrungen mit Psychedelica.</span>
  </div>

  <Button color="indigo" to="/reports" class="!px-8"> Trip-Berichte </Button>

  <div class="h-30"></div>
</template>

<script setup lang="ts">
import Puzzle from "../steps/Puzzle.vue"
</script>
