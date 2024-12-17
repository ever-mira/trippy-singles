<template>
  <div>
    <div id="dropdown" class="relative w-full md:w-60 mt-7">
      <button id="dropdown-button" @click.stop="toggleDropdown"
        class="inline-flex justify-between w-full px-4 py-2.2 text-sm text-sub dark:text-sub-dark border-1 border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none">
        <span class="mr-2 text-[1rem]">{{ dropdownValue }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-2 -mr-2 float-right" viewBox="0 0 20 20"
          fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd"
            d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <div id="dropdown_list"
        class="absolute left-0 mt-2 h-auto max-h-100 overflow-y-scroll rounded-md shadow-lg bg-white dark:bg-black ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-7"
        @click.stop v-if="isOpen">

        <Input id="filter_input" type="text" :placeholder="$t('profile.location.country_filter')" autocomplete="off"
          class="!py-1.4" v-model="filter" focus />

        <span v-for="(option) in filteredCountries"
          class="block px-4 py-1.5 text-left text-sub dark:text-sub-dark hover:bg-gray-100 dark:hover:bg-gray-900 active:bg-blue-100 cursor-pointer rounded-md"
          @click="onContrySelected(option)">
          {{ option.native }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, useTemplateRef, nextTick } from 'vue'
import type Country from '~~/types/country'
import { countries } from 'countries-list'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: Country | undefined
}>()

const countryArray = Object.entries(countries).map(([code, details]) => ({
  code,
  ...details
}))

const selectedCountry = ref<Country>()
let isOpen = ref(false)
let filter = ref('')

const { t } = useI18n()

const dropdownValue = computed(() => {
  return selectedCountry.value ? selectedCountry.value.native : t('profile.location.select_country')
})

const filteredCountries = computed(() => {
  return countryArray.filter(country => {
    if (filter.value) {
      return country.name.toLowerCase().startsWith(filter.value.toLowerCase()) || country.native.toLowerCase().startsWith(filter.value.toLowerCase())
    }
    return true
  })
})

const onContrySelected = (country: any) => {
  selectedCountry.value = country
  isOpen.value = false
  emit('update:modelValue', country)
}

async function toggleDropdown() {
  isOpen.value = !isOpen.value
  filter.value = ''
}

function closeDropdown() {
  isOpen.value = false
}

onMounted(async () => {
  document.addEventListener('click', closeDropdown)
})

const loadCountry = (countryObject: Country) => {
  let country_code = countryObject.code

  if (country_code) {
    let country = countryArray.find(country => {
      return country.code === country_code
    })
    selectedCountry.value = country
  }
}

watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    loadCountry(newValue)
  }
}, { immediate: true })


</script>
