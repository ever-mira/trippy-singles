<template>
  <div class="relative inline-block p.9 rounded-full shadow-sm hover:bg-gray-50 ml-2.3 h-fit" @click="showMenu()"
    @mouseleave="hideMenu">
    <EllipsisHorizontalIcon class="h-4 cursor-pointer" />
    <div class="absolute -ml-1" v-if="menuVisible" @mouseleave="hideMenu">
      <div
        class="mt-1.3 flex flex-col bg-gray-50 bg-opacity-95 shadow-md rounded-lg py-1.9 px-3 min-w-35 gap-y-1 text-sm">
        <span class="cursor-pointer" @click="deleteClick" v-if="isOwnComment">
          {{ t('delete') }}
        </span>
        <span class="cursor-pointer" @click="reportClick">
          {{ t('report') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { EllipsisHorizontalIcon } from "@heroicons/vue/24/outline"

const props = defineProps<{ comment: any, category: 'reports' | 'hints' }>()
const emit = defineEmits(['deleteClicked'])
const user = useSupabaseUser()
const { showModal } = useModal()

const isOwnComment = computed(() => {
  return props.comment.user_id === user.value?.id
})

const menuVisible = ref(false)

const showMenu = () => {
  menuVisible.value = true
}

const hideMenu = () => {
  menuVisible.value = false
}

const deleteClick = () => {
  emit('deleteClicked')
}
const reportClick = () => {
  showModal('Diese Funktion kommt bald')
}

const { t } = useI18n()
</script>

<i18n lang="json">{
  "de": {
    "delete": "löschen",
    "report": "melden"
  },
  "en": {
    "delete": "delete",
    "report": "report"
  }
}</i18n>

<style scoped></style>
