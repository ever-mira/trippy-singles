<template>
  <div>
    <div class="mt-7 relative text-3xl font-bold">{{ username }}</div>

    <div class="mt-1 relative text-lg text-gray-600 dark:text-gray-400">
      {{ t("subtitle") }}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-y-3.5 relative items-center mt-8">
      <span class="hidden md:inline">{{ t("email") }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <Input type="email" ref="mailInputRef" :placeholder="t('email')" v-model="credentials.email" class="md:w-[210px]"
        :focus="!ismobile()" />
      <span class="hidden md:inline">{{ t("password") }}&nbsp;&nbsp;</span>
      <Input type="password" :placeholder="t('password')" v-model="credentials.password" class="md:w-[210px]"
        @keydown.enter="signUp" />
    </div>

    <div class="mt-6 h-8" v-if="message">
      <span class="text-gray-700">{{ message }}</span>
    </div>
    <div class="mt-7">
      <Button @click="signUp" class="!px-5.5">{{ t("create_account") }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Picture from "./Picture.vue"
import ismobile from 'is-mobile'

const { setStepComponent, username } = useSteps()
const supabase = useSupabaseClient()

const credentials = reactive({
  email: "",
  password: "",
})

const message = ref("")

const signUp = async () => {
  message.value = ""

  try {
    const signupData = {
      ...credentials,
      username: username.value,
    }

    const result = await $fetch<{ success: boolean }>("/api/signup", {
      method: "POST",
      body: signupData,
    })

    if (result.success) {
      await supabase.auth.signInWithPassword(credentials)

      setStepComponent(Picture)
    }
  } catch (error: any) {
    message.value = error.statusMessage
  }
}
const { t } = useI18n()
</script>


<i18n lang="json">{
  "de": {
    "subtitle": "Email und Passwort festlegen.",
    "email": "E-Mail",
    "password": "Passwort",
    "create_account": "Account erstellen"
  },
  "en": {
    "subtitle": "set login data",
    "email": "Email",
    "password": "Password",
    "create_account": "Create Account"
  }
}</i18n>