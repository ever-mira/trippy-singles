<template>
  <div @click="toggleLike">
    <HeartIconSolid class="inline w-5.6 ml-2 -mt.2 text-red-700 cursor-pointer" v-if="liked" />
    <HeartIcon class="inline w-5.6 ml-2 -mt.2 text-gray-500 hover:text-red-600 cursor-pointer" v-else
      :class="{ 'text-red-700': likedByListCount > 0 }" />
  </div>
  <div class="relative px-1.3 text-sm text-gray-700 dark:text-gray-300 cursor-default" v-if="likedByListCount > 0"
    @mouseenter="showList" @mouseleave="hideList" @click="showList">
    <div>
      {{ likedByListCount }}
      <span class="text-gray-500" v-if="likedByListCount === 1">like</span>
      <span class="text-gray-500" v-else>likes</span>
    </div>
    <div class="absolute" @mouseenter="showList" @mouseleave="hideList" v-if="showLikesList">
      <div class="mt-1.3 flex flex-col bg-gray-50 bg-opacity-95 shadow-md rounded-lg py-1.7 px-3 min-w-37 gap-y.4">
        <span v-for="like in likedByList">
          <UsernameLink :userName="like.profiles.username" class="block !text-gray-700" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HeartIcon } from "@heroicons/vue/24/outline"
import { HeartIcon as HeartIconSolid } from "@heroicons/vue/24/solid"

const props = defineProps<{ comment: any, category: 'reports' | 'hints' }>()

const user = useSupabaseUser()
const { profile } = useUser()
const { showModal } = useModal()
const { addLike, removeLike } = useCommentLikes(props.category)

const liked = ref(false)

const likedByList = ref<Array<any>>(props.comment.liked_by)
const likedByListCount = computed(() => {
  return likedByList.value.length
})

const showLikesList = ref(false)

const showList = () => {
  showLikesList.value = true
}

const hideList = () => {
  showLikesList.value = false
}

liked.value = likedByList.value.some((item: any) => {
  return item.user_id === user.value?.id
})

const toggleLike = async () => {
  if (!user.value) {
    showModal("Du musst eingeloggt sein, um liken zu können.")
    return
  }
  if (!navigator.onLine) {
    showModal("Kein Internet.")
    return
  }
  liked.value = !liked.value

  if (liked.value) {
    addSelfToList()
    try {
      await addLike(props.comment.id)
    } catch {
      liked.value = !liked.value
      removeSelfFromList()
    }
  } else {
    removeSelfFromList()
    try {
      await removeLike(props.comment.id)
    } catch {
      liked.value = !liked.value
      addSelfToList()
    }
  }
}

const addSelfToList = async () => {
  likedByList.value.push(
    {
      user_id: user.value?.id,
      profiles: {
        username: profile.value?.username
      }
    })
}

const removeSelfFromList = async () => {
  likedByList.value.splice(likedByList.value.findIndex(item => item.user_id === user.value?.id), 1)
}
</script>

<style scoped></style>
