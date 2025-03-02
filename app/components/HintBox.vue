<template>
  <div
    class="bg-blue-50 dark:bg-black dark:border dark:border-gray-800 text-blue-900 dark:text-blue-300 bg-opacity-50 p-4 md:p-5 rounded-xl flex flex-col cursor-pointer"
    @click="isOpen = !isOpen">
    <div class="flex">
      <div class="px-2.5">
        <Component :is="icon" class="inline w-6 text-blue-700 mr-1.5 -ml-2.2 -mt-.8 text-blue-900 dark:text-blue-200">
        </Component>
      </div>
      <div class="flex w-full">
        <slot></slot>
        <div class="font-semibold ml-8.5 text-right" :class="{ 'grow': triggerRight }">
          <span class="mr-1">{{ t("more") }}</span>
          <ChevronDownIcon class="inline w-4 -mt-0.7" v-if="!isOpen" />
          <ChevronUpIcon class="inline w-4 -mt-0.7" v-else />
        </div>
      </div>
    </div>
    <div class="mt-7" v-if="isOpen">
      <slot name="addition"></slot>
    </div>
    <div class="mt-6 cursor-default" @click.stop="" v-if="isOpen">
      <Comments category="hints" :resourceId="props.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Comments from "~/components/shared/Comments.vue"
import { ChevronDownIcon } from "@heroicons/vue/24/solid"
import { ChevronUpIcon } from "@heroicons/vue/24/solid"

interface Props {
  name: 'every_should_trip_reports' | "conversations_improvisation_magic" | "every_report_little_magic",
  icon: Component,
  triggerRight?: boolean
}

const props = defineProps<Props>()

const isOpen = ref(false)

const { t } = useI18n()
</script>

<i18n lang="json">{
  "de": {
    "more": "mehr"
  },
  "en": {
    "more": "more"
  }
}</i18n>

<style scoped></style>
