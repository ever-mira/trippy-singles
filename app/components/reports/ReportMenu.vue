<template>
  <div class="relative inline-block p-1 rounded-full shadow-md dark:bg-gray-900 ml-3 h-fit mt.5" @click="showMenu()"
    @mouseleave="hideMenu">
    <EllipsisHorizontalIcon class="h-5 cursor-pointer" />
    <div class="absolute -ml-1" v-if="menuVisible" @mouseleave="hideMenu">
      <div
        class="mt-1.3 flex flex-col bg-gray-50 dark:bg-gray-900 bg-opacity-95 shadow-md rounded-lg py-2.2 px-3 min-w-35 gap-y-1.3 text-[1rem]">
        <span class="cursor-pointer" @click="deleteClick" v-if="isOwnReport">
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
import type { ExtendedReport } from '~~/types/extended.types';

const props = defineProps<{ report: ExtendedReport }>()
const emit = defineEmits(['deleteClicked'])

const user = useSupabaseUser()
const { deleteReport } = useReports()
const { showModal } = useModal()
const router = useRouter()

const isOwnReport = computed(() => {
  return props.report.user_id === user.value?.id
})

const menuVisible = ref(false)

const showMenu = () => {
  menuVisible.value = true
}

const hideMenu = () => {
  menuVisible.value = false
}

const deleteClick = () => {
  showModal(t('really_delete_report'), true, yesDeleteClicked)
}

const yesDeleteClicked = async () => {
  await deleteReport(props.report.id)
  router.push('/reports')
}

const reportClick = () => {
  showModal('Diese Funktion kommt bald')
}

const { t } = useI18n()
</script>


<i18n lang="json">{
  "de": {
    "delete": "löschen",
    "report": "melden",
    "really_delete_report": "Diesen Trip-Report wirklich löschen?"
  },
  "en": {
    "delete": "delete",
    "report": "report",
    "really_delete_report": "Really delete this report?"
  }
}</i18n>


<style scoped></style>
