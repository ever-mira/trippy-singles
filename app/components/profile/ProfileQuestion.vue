<template>
  <div class="w-full border-l border-gray-3 pl-3 xl:w-90% 2xl:w-65% 3xl:w-55% mt-14">
    <div class="flex">
      <div class="text-xl">
        <slot></slot>
      </div>
      <div class="ml-5" v-if="isOwnProfile">
        <Button color="gray" size="small" @click="editMode = true" v-if="!editMode && isOwnProfile"
          class="!py-1.4 !px-4">
          <span> bearbeiten </span>
        </Button>

        <Button color="white" size="small" @click="cancel" v-if="editMode" class="!py-1.5 !px-4">
          abbrechen
        </Button>
      </div>
    </div>

    <div class="flex flex-col mt-3">
      <div v-if="ownProfile && editMode">
        <span class="text-gray-700 text-md">
          <slot name="subtitle"> </slot>
        </span>
        <Textarea class="w-full mt-1.1 h-40" v-model="answer" maxlength="1400"></Textarea>
      </div>
      <span class="whitespace-pre-wrap" v-else>{{ answer ? answer : "-" }}</span>
    </div>

    <div class="mt-5" v-if="editMode">
      <Button color="indigo" size="small" @click="save" v-if="editMode" class="!py-2 !px-4">
        speichern
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tables } from "~~/types/database.types"
type Profile = Tables<"profiles">

interface Props {
  field_name: keyof Profile
}
const props = defineProps<Props>()

const { profile: ownProfile, saveProfile } = useUser()
const { profile, isOwnProfile } = useProfile()

const answer = ref("")
const editMode = ref(false)

if (profile.value) {
  answer.value = profile.value[props.field_name] as string
}

function setFieldInProfile<K extends keyof Profile>(key: K, value: Profile[K]) {
  if (profile.value) profile.value[key] = value
  if (ownProfile.value) ownProfile.value[key] = value
}

const save = () => {
  setFieldInProfile(props.field_name, answer.value as Profile[typeof props.field_name])
  saveProfile()
  editMode.value = false
}

const cancel = () => {
  answer.value = profile.value ? (profile.value[props.field_name] as string) : ""
  editMode.value = false
}
</script>
