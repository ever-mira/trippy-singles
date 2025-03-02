<template>
  <div>
    <div class="mt-7 relative text-3xl font-bold">{{ t('join_trippy') }}</div>
    <div class="mt-1 relative text-lg text-gray-600 dark:text-gray-300">
      {{ t("subtitle") }}
    </div>

    <div class="mt-8 md:mt-12 relative">
      <Input placeholder="Username" v-model="username" :focus="!ismobile()" class="w-[255px] md:w-[220px]"
        @keydown.enter="next" />
      <div
        class="block absolute md:relative top-0 md:top-auto right-3 md:right-auto clear-none md:inline ml.5 md:ml-3 mt-2 md:mt-0 text-green-600">
        <span class="text-green-600" v-if="available">
          {{ t("username_free") }}
        </span>
        <span class="text-red-700" v-if="available === false">
          {{ t("username_taken") }}
        </span>
      </div>

      <p class="mt-3.5 text-gray-500 dark:text-gray-300">https://trippy.social/@{{ username }}</p>
    </div>

    <div class="mt-6 h-8" v-if="message">
      <span class="text-gray-700">{{ message }}</span>
    </div>
    <div class="mt-7">
      <Button @click="next" class="!px-7" :disabled="!available">{{ t("next") }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SignupStepLogin from "./SignupStepLogin.vue"
import debounce from "lodash.debounce"
import { validateUsername } from "@utils/usernameValidation"
import ismobile from 'is-mobile'

const { setStepComponent, username } = useSteps()

const message = ref<string>("")
const available = ref<boolean | null>(null)

const checkAvailability = debounce(async (name: string) => {
  if (!name) {
    available.value = null
    return
  }

  const { valid, errors } = validateUsername(name)
  if (!valid) {
    message.value = errors[0] || ""
    return
  }

  try {
    const result = await $fetch<{ available: boolean }>(
      `/api/check-username?username=${encodeURIComponent(username.value)}`
    )

    available.value = result.available
  } catch (error: any) {
    message.value = error.statusMessage || "Es gab ein Problem mit der Anfrage"
  }
}, 250)

watch(
  username,
  (newVal) => {
    available.value = null
    message.value = ""

    checkAvailability(newVal)
  },
  { immediate: true }
)

const next = async () => {
  if (!available.value) return
  setStepComponent(SignupStepLogin)
}
const { t } = useI18n()
</script>


<i18n lang="json">{
  "de": {
    "join_trippy": "Join Trippy",
    "subtitle": "Wie willst du auf Trippy heißen?",
    "username_free": "frei",
    "username_taken": "vergeben",
    "next": "Weiter"
  },
  "en": {
    "join_trippy": "Join Trippy",
    "subtitle": "Choose a username on Puzzle",
    "username_free": "free",
    "username_taken": "taken",
    "next": "Next"
  }
}</i18n>