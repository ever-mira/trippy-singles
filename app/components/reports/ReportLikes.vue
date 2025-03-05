<template>
  <div class="flex flex-col mt-7 border-l">
    <button class="flex w-fit pl-1.25 pr-3 py-2 items-center cursor-pointer" @click="toggleLike" :disabled="pending">
      <HeartIconSolid class="inline w-6.9 mr-2 -mt.2 text-red-700 hover:text-red-600" v-if="liked" />
      <HeartIcon class="inline w-6.9 mr-2 -mt.2 hover:text-red-600" :class="{ 'text-red-700': likesCount > 0 }"
        v-else />
      <span class="font-semibold">
        {{ likesCount }}</span>&nbsp;<span v-if="likesCount === 1">like</span><span v-else>likes</span>
    </button>

    <div class="flex w-fit py-1.4 px-2 gap-1.7" v-if="likes.length > 0">
      <Avatar :userName="like.profiles.username" :avatarUrl="like.profiles.avatar_url" v-for="like in likes"
        :key="like.user_id" class="w-7" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { HeartIcon } from "@heroicons/vue/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/24/solid"

const props = defineProps<{ reportId: string }>()

const user = useSupabaseUser()
const { showModal } = useModal()
const { likes, loadLikes, addLike, removeLike, likesCount } = useLikes(props.reportId as string)

const pending = ref(false)
const liked = ref(false)

await loadLikes()
liked.value = likes.value?.some(likeUser => likeUser.user_id === user.value?.id)


const toggleLike = async () => {
  if (!user.value) {
    showModal("Du musst eingeloggt sein, um liken zu können.")
    return
  }
  if (!navigator.onLine) {
    showModal("Kein Internet.")
    return
  }
  pending.value = true
  liked.value = !liked.value

  if (liked.value) {
    likesCount.value = likesCount.value + 1
    try {
      await addLike()
    } catch {
      liked.value = !liked.value
      likesCount.value = likesCount.value - 1
    }
  } else {
    likesCount.value = likesCount.value - 1
    try {
      await removeLike()
    } catch {
      liked.value = !liked.value
      likesCount.value = likesCount.value + 1
    }
  }

  await loadLikes()
  pending.value = false
}
</script>

<style scoped></style>
