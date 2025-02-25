<template>
  <div>
    <span class="text-xl">Kommentare</span>&nbsp;
    <span class="text-gray-800 text-sm">(ähnliches erlebt? - ergänze die Erlebnisse)</span>
    <p class="text-gray-700 mt-3" v-if="reportComments.length === 0">-</p>

    <div v-for="comment in reportComments" :key="comment.id" class="flex gap-x-3 mt-7">
      <NuxtLink :to="`/@${comment.profiles.username}`" class="mt-auto">
        <NuxtImg :src="comment.profiles.avatar_url || ''" class="w-12 rounded-full" height="70" width="70" fit="cover"
          v-if="comment.profiles.avatar_url" />
        <PlaceholderAvatar v-else />
      </NuxtLink>
      <div class="flex-1 grow">
        <div class="flex">
          <NuxtLink :to="`/@${comment.profiles.username}`" class="text-blue-600 hover:text-blue-500">
            {{ comment.profiles.username }}
          </NuxtLink>
          <span class="text-gray-700 ml-2">{{ formatDate(comment.created_at) }}</span>
        </div>
        <div class="mt-1">{{ comment.text }}</div>
      </div>
    </div>

    <div class="mt-9">
      <span class="text-lg">Kommentar hinzufügen</span>&nbsp;
      <Textarea class="w-full mt-1.6 h-20" v-model="comment"></Textarea>
      <Button class="!px-5 mt-1.8" @click="save">Abschicken</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatRelative, parseISO } from "date-fns"
import { de } from "date-fns/locale"
const { report, reportComments, saveComment } = useReports()

const comment = ref("")

const save = async () => {
  await saveComment(report.value.id, comment.value)
  comment.value = ""
}

function formatDate(dateString: string) {
  let formattedDate: string = formatRelative(parseISO(dateString), new Date(), { locale: de })
  return formattedDate
}
</script>

<style scoped></style>
