<template>
  <div class="flex flex-col mt-7 border-l">
    <div class="flex w-fit pl-1.25 pr-3 py-2 items-center  cursor-pointer" @click="heartClick">
      <HeartIconSolid class="inline w-7 mr-2 -mt.2 text-red-700 hover:text-red-600" v-if="selfLiked" />
      <HeartIcon class="inline w-7 mr-2 -mt.2 text-red-700 hover:text-red-600" v-else />
      <span class="font-medium">
        {{ likesCount }}</span>&nbsp;<span v-if="likes.length === 1">like</span><span v-else>likes</span>
    </div>

    <div class="flex w-fit py-1.5 px-2" v-if="likes.length > 0">
      <NuxtLink :to="`/@${like.profiles.username}`" class="mx.8" v-for="like in likes">
        <NuxtImg :src="like.profiles.avatar_url || ''" class="w-7 rounded-full shadow-md" height="70" width="70"
          fit="cover" v-if="like.profiles.avatar_url" />
        <PlaceholderAvatar v-else />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HeartIcon } from "@heroicons/vue/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/24/solid"

const props = defineProps<{ reportId: string }>()

const user = useSupabaseUser()
const { showModal } = useModal()
const { likes, loadLikes, addLike, removeLike } = useLikes(props.reportId as string)

await loadLikes()

const likesCount = computed(() => {
  return likes.value?.length
})

const selfLiked = computed(() => {
  return likes.value?.some(likeUser => likeUser.user_id === user.value?.id)
})

const heartClick = async () => {
  if (!user.value) {
    showModal("Du musst eingeloggt sein, um liken zu können.")
    return
  }
  if (selfLiked.value) {
    await removeLike()
  } else {
    await addLike()
  }
  await loadLikes()
}
</script>

<style scoped></style>
