<template>
  <div class="text-lg mt-8 lg:-mt-3 mb-5 lg:mb-0">
    <div class="w-full px-2">
      <transition name="stepChange" mode="out-in">
        <component :is="stepComponent"></component>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const { stepComponent } = useSteps()
</script>

<style>
.stepChange-leave-active {
  transition: all 0.14s ease;
}

.stepChange-enter-active {
  transition: all 0.14s ease;
}

.stepChange-leave-to {
  opacity: 0;
  transform: translateX(-4px);
}

.stepChange-enter-from {
  opacity: 0;
  transform: translateX(4px);
}
</style>
