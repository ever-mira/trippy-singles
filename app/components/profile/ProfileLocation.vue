<template>
  <div>
    <div class="text-lg">
      <MapPinIcon class="inline w-5 -mt-1" /> Standort
      <div class="inline mt-2 ml-5" v-if="isOwnProfile">

        <Button color="gray" size="small" @click="editMode = true" v-if="!editMode && isOwnProfile"
          class="!py-1.5 !px-4">
          <span v-if="!profile?.location_label">
            setzen
          </span>
          <span v-else>
            ändern
          </span>
        </Button>

        <Button color="white" size="small" @click="editMode = false" v-if="editMode" class="!py-1.7 !px-4">
          abbrechen
        </Button>
      </div>
    </div>
    <div class="mt-2 ml.5" v-if="!editMode">
      <span v-if="profile?.location_label">
        {{ profile.location_label }}
      </span>
      <span v-if="!profile?.location_label">
        nicht angegeben
      </span>
    </div>
    <div class="gap-x-2 mt-5" v-if="editMode">
      <!-- <CountrySelect v-model="selectedCountry" /> -->
      <!-- <CitySearch v-model="selectedLocation" :country="selectedCountry" v-if="selectedCountry" /> -->
      <AutocompleteLocation v-model="selectedLocation" />
      <Button color="indigo" size="small" @click="save" v-if="editMode && selectedLocation" class="mt-5 !py-2 !px-4">
        speichern
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MapPinIcon } from '@heroicons/vue/24/outline'

const { profile, isOwnProfile, setLocationLabel } = useProfile()
const editMode = ref(false)
const selectedLocation = ref()

const save = async () => {
  if (selectedLocation.value) {
    try {
      await $fetch('/api/users/me/location', {
        method: 'POST',
        body: selectedLocation.value,
      })
      editMode.value = false
      setLocationLabel(selectedLocation.value.label)
    } catch (error) {
      console.error(error)
    }
  }
}

</script>
