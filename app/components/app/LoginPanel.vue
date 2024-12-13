<template>
  <div>
    <Button color="indigo" size="small" @click="signup" class="mt-3 !px-4 mx-auto ">
      {{ $t('app.signup') }}
    </Button>
    <Button color="white" size="small" @click="login" class="mt-3 !px-7 ml-3">
      {{ $t('app.login') }}
    </Button>
  </div>
</template>

<script setup lang="ts">
const { hideSidebar } = useApp()
import Login from "../steps/Login.vue"
import SignupStepUsername from "../steps/SignupStepUsername.vue"

const router = useRouter()
const { setStepComponent } = useSteps()

const login = async () => {
  router.push({ path: '/' })
  setStepComponent(Login)
  hideSidebar()
}

const signup = async () => {
  router.push({ path: '/' })
  setStepComponent(SignupStepUsername)
  hideSidebar()
}
</script>
