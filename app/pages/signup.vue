<template>
  <Page>
    <div
      class="w-full md:w-103 mx-auto lg:ml-20% xl:ml-26% mt-17 2xl:mt-21 3xl:mt-25 rounded-2xl bg-whitec md:shadow-sm bg-opacity-30 p-4.5 lg:p-7">
      <div class="text-3xl w-full text-center pt-4 lg:pt-7 text-blue-7">Registrieren</div>
      <div class="w-full text-center mt-.9">Erstelle einen Account auf Trippy</div>

      <div class="flex flex-col gap-y-4 mt-7">
        <div class="flex flex-col gap-y-1">
          <span class="text-sm">Username</span>
          <Input type="email" ref="mailInputRef" placeholder="Wähle einen Benutzernamen" v-model="credentials.email"
            class="lg:!py-1.4" focus />
        </div>

        <div class="flex flex-col gap-y-1">
          <span class="text-sm"> {{ $t("signup.email") }}</span>
          <Input type="email" ref="mailInputRef" :placeholder="$t('signup.email')" v-model="credentials.email"
            class="lg:!py-1.4" focus />
        </div>

        <div class="flex flex-col gap-y-1">
          <span class="text-sm">{{ $t("signup.password") }}</span>
          <Input type="password" :placeholder="$t('signup.password')" v-model="credentials.password" class="lg:!py-1.4"
            @keydown.enter="signUp" />
        </div>

        <div class="flex flex-col gap-y-1">
          <span class="text-sm">Passwort wiederholen</span>
          <Input type="password" :placeholder="$t('signup.password')" v-model="credentials.password" class="lg:!py-1.4"
            @keydown.enter="signUp" />
        </div>

        <Button class="w-full !rounded-lg mt-2.5">Account erstellen</Button>

        <div class="w-full text-center mt-.9">
          Du hast bereits einen Account? <span class="text-blue-700">hier einloggen</span>
        </div>
      </div>
    </div>
  </Page>
</template>

<script setup lang="ts">
const credentials = reactive({
  email: "",
  password: "",
})

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
</script>

<style></style>
