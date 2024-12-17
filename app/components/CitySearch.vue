<template>
  <div>
    <div class="flex mt-4">
      <Input type="text" :placeholder="$t('profile.location.insert_city')" v-model="cityQuery"
        @keydown.enter="searchCity" focus />

      <Button color="white" @click="searchCity" class="!px-6 !py-2.25 ml-0 md:ml-5 mt-5 md:mt-0">
        {{ $t('profile.location.search') }}
      </Button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import type Country from '~~/types/country'
import type OsmLocation from '~~/types/osmLocation';

const emit = defineEmits(['update:modelValue'])

const props = defineProps<{
  modelValue: OsmLocation | undefined
  country: Country
}>()

const cityQuery = ref('')

const searchCity = () => {
  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cityQuery.value}&countrycodes=${props.country?.code}&limit=10`)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        emit('update:modelValue', data[0])
      } else {
        emit('update:modelValue', null)
      }
    })
}
</script>
