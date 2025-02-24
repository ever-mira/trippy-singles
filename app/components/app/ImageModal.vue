<template>
  <div id="imageModal"
    class="fixed inset-0 h-full bg-black bg-opacity-99% flex items-center justify-center z-50 cursor-pointer"
    v-if="visible" @click="hideModal">
    <NuxtImg :src="imgUrl" height="910"
      class="max-w-full my-auto w-auto h-auto lg:max-h-70% xl:max-h-60% object-contain" densities="1" />
  </div>
</template>


<script setup lang="ts">
const { hideModal, visible, imgUrl } = useImageModal()

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
