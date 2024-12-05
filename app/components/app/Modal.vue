<template>
  <div v-if="visible"
    class="fixed left-0 top-0 bg-opacity-30 bg-gray-400 h-screen w-screen flex items-center justify-center z-40">
    <div class="flex w-auto grow p-2 items-center justify-center">
      <!-- Overlay -->
      <div class="bg-white dark:bg-gray-900 -mt-32 md:-mt-55 rounded-md shadow-sm w-full max-w-md grow">
        <!-- Header -->
        <div class="bg-indigo-600 dark:bg-indigo-900 text-white py-1.5 px-4 rounded-t-md">
          <h2 class="text-lg font-semibold">
            {{ $t('app.title') }}
          </h2>
        </div>

        <!-- Content -->
        <div class="p-4">
          <br />
          <p>{{ text }}</p>
          <div class="h-10"></div>

          <Button color="indigo" @click="hideModal" class="mt-1" v-if="!yesNo">
            {{ $t('app.ok') }}
          </Button>

          <div v-else>
            <Button color="indigo" @click="yesClicked" class="mt-1">
              {{ $t('app.yes') }}
            </Button>
            <Button color="white" @click="hideModal" class="ml-4 mt-1">
              {{ $t('app.cancel') }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
const { hideModal, visible, text, yesNo, callback } = useModal()

const yesClicked = () => {
  if (callback.value) {
    callback.value()
  }
  hideModal()
}
</script>