<template>
  <div class="md:w-85">
    <Input v-model="searchQuery" placeholder="Standort eingeben" @focus="onFocused" @blur="onBlur" :loading="isLoading"
      :focus="!initialLoad && !ismobile()" />
    <div class="relative">
      <div id="dropdown_list"
        class="absolute hidden h-auto w-full max-h-100 overflow-y-scroll rounded-md shadow-lg bg-white dark:bg-black ring-1 ring-black ring-opacity-5 p-1 space-y-1 z-7"
        :class="{ '!block': isOpen }" ref="dropdown_list" @click.stop>

        <span v-for="(option) in transformedOptions"
          class="block px-4 py-1.5 text-left text-sub dark:text-sub-dark hover:bg-gray-100 dark:hover:bg-gray-900 active:bg-blue-100 cursor-pointer rounded-md"
          @click="onSelected(option)">
          {{ option.label }}
        </span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import debounce from 'lodash.debounce'
import ismobile from 'is-mobile'

const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const searchQuery = ref('')
const filteredOptions = ref<any[]>([])
const selectedOption = ref()
const isLoading = ref(false)
const isFocused = ref(false)
const initialLoad = ref(false)

watch(
  searchQuery,
  async (newQuery) => {
    if (newQuery.trim().length === 0) {
      filteredOptions.value = []
      return
    }
    if ((selectedOption.value && selectedOption.value.label === newQuery) || newQuery.length < 3) {
      return
    }
    if (!initialLoad.value)
      debounceUpdateSuggestions(newQuery)
  },
  { immediate: false }
)

const updateSuggestions = async (query: string) => {
  isLoading.value = true

  const params = new URLSearchParams({
    q: query,
    limit: '5',
    lang: 'de',
  })

  try {
    const response = await $fetch<{ features: any }>(`https://photon.komoot.io/api/?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    if (response && response.features) {
      filteredOptions.value = response.features
    } else {
      filteredOptions.value = []
    }
  } catch (error) {
    console.error('API error:', error)
  } finally {
    isLoading.value = false
  }
}

const debounceUpdateSuggestions = debounce(updateSuggestions, 300)

const transformedOptions = computed(() => {
  return filteredOptions.value.map((option) => {
    return {
      label: getLabel(option.properties),
      value: option
    }
  })
})

const isOpen = computed(() => filteredOptions.value.length > 0 && isFocused.value)

const onSelected = (option: any) => {
  filteredOptions.value = []
  selectedOption.value = option
  searchQuery.value = option.label
  emit('update:modelValue', option)
}

const onBlur = () => {
  setTimeout(() => {
    isFocused.value = false
  }, 300)
}

const onFocused = async () => {
  await nextTick()
  isFocused.value = true
  initialLoad.value = false
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      searchQuery.value = newValue.label
      initialLoad.value = true
    }
  },
  { immediate: true }
)

const getLabel = (properties: any) => {
  let label = ''
  switch (properties.type) {
    case 'house':
      if (properties.name) {
        label = properties.name + ', '
      }
      if (properties.street) {
        label += properties.street
      }
      if (properties.housenumber) {
        label += ' ' + properties.housenumber
      }
      if (properties.housenumber || properties.street) {
        label += ', '
      }
      label += properties.postcode + ' ' + properties.city
      break
    case 'street':
      label = properties.name + ', ' + properties.postcode + ' ' + properties.city
      break
    case 'city':
      if (properties.postcode) {
        label = properties.postcode + ' '
      }
      label += properties.name
      if (!properties.postcode) {
        if (properties.county) {
          label += ', ' + properties.county
        }
        if (properties.state) {
          label += ', ' + properties.state
        }
      }
      if (properties.country) {
        label += ', ' + properties.country
      }
      break
    case 'locality':
      label = properties.name
      if (properties.district) {
        label += ', ' + properties.district
      }
      if (properties.city) {
        label += ', ' + properties.city
      }
      break
    case 'place':
      label = properties.postcode + ' ' + properties.city + ', ' + properties.country
      break
    case 'district':
      label = properties.name
      if (properties.city) {
        label += ', ' + properties.city
      }
      if (properties.county) {
        label += ', ' + properties.county
      }
      if (properties.state) {
        label += ', ' + properties.state
      }
      break
    case 'county':
      label = properties.name + ', ' + properties.country
      break
    case 'state':
      label = properties.name
      if (properties.country) {
        label += ', ' + properties.country
      }
      break
    case 'country':
      label = properties.name
      break
    default:
      label = properties.name
      if (properties.postcode) {
        label += ', ' + properties.postcode
      }
      if (properties.city) {
        label += ' ' + properties.city
      }
      if (properties.state) {
        label += ', ' + properties.state
      }
      if (properties.country) {
        label += ', ' + properties.country
      }
  }
  return label
}

</script>

<style scoped></style>