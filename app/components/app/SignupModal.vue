<template>
    <div id="signupModal"
    class="fixed inset-0 bg-opacity-30 bg-gray-300 h-full flex items-center justify-center z-50 cursor-pointer"
    v-if="visible" @click="hideModal">
    <div class="bg-white py-6 rounded-xl p-6 -mt-20 lg:-mt-40 shadow-lg w-full md:w-124 h-110 cursor-default"  @click.stop="">
      <Stepper class="md:w-70 mx-auto"/>
    </div>
  </div>
</template>


<script setup lang="ts">
import Stepper from "./Stepper.vue"
const { hideModal, visible } = useSignupModal()

const router = useRouter()

router.beforeEach((to, from, next) => {
  if (visible.value) {
    hideModal()
    next(false)
  } else {
    next()
  }
})

</script>
