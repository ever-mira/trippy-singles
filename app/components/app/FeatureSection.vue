<template>

  <div class="mt-22 ml-3 lg:ml-7">
    <span class="text-3xl">Das Konzept.</span><br>
  </div>

  <div class="mt-19 lg:mt-22 ml-3 lg:ml-7">
    <span class="text-xl">Diese Erfahrungen ans Licht zu holen,
      erhöht unser Bewusstsein, und erschafft eine Realität, in der Magie real ist.
    </span><br>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 mt-19 gap-4 w-full xl:w-90% 2xl:w-80% 3xl:w-75%">
    <FeatureBox>
      Visionen erschaffen
      <template v-slot:content>
        Realitäten wahr werden lassen
      </template>
    </FeatureBox>

    <FeatureBox>
      Erkenntnisse teilen
      <template v-slot:content>
        Erfahrungen und Wissen tauschen
      </template>
    </FeatureBox>

    <FeatureBox>
      Freunde finden
      <template v-slot:content>
        Wer hat ähnliches erlebt?
      </template>
    </FeatureBox>
  </div>

  <div class="mt-19">
    <h2 class="text-2xl">Sich gegenseitig erinnern.</h2>
    <span class="text-lg text-gray-700">An die Momente, die wir erlebt haben, aber die im Alltag verloren
      gegangen
      sind.</span>
  </div>

  <div class="mt-19 text-xl lg:w-70% xl:w-60% 2xl:w-50% 3xl:w-47%">
    <img src="/assets/wordcloud.png">
  </div>

  <div class="mt-19 mb-11">
    <h2 class="text-2xl">Was hast du schon alles erlebt, und längst wieder vergessen?</h2>
    <span class="text-lg text-gray-700">Deine verrücktesten Erfahrungen mit Psychedelica.</span>
  </div>

  <Button color="indigo" to="/reports" class="!px-8">
    Trip-Berichte
  </Button>

</template>