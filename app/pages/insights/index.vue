<template>
  <Page>
    <div class="flex flex-col lg:flex-row w-full">
      <div class="flex-1">
        <Heading>
          Erkenntnisse
          <template v-slot:subtitle>Erkenntnisse und Einsichten</template>
        </Heading>
      </div>

      <div class="flex-1">
        <div class="mt-11 lg:mt-4">

        </div>
      </div>

      <div class="flex-1"></div>
    </div>

    <HintBox class="mt-19 lg:mt-22" name="best_insights" :icon="RocketLaunchIcon">
      Was sind deine besten Realisierungen?</HintBox>
  </Page>
</template>

<script setup lang="ts">
import { RocketLaunchIcon } from "@heroicons/vue/24/outline"
</script>

<style></style>
