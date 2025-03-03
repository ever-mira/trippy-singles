import type { ExtendedLike } from "~~/types/extended.types"

export default function useLikes(category: string) {
  const addLike = async (commentId: number) => {
    await $fetch(`/api/${category}/all/comments/${commentId}/likes`, {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
    })
  }

  const removeLike = async (commentId: number) => {
    await $fetch(`/api/${category}/all/comments/${commentId}/likes`, {
      method: "DELETE",
      headers: useRequestHeaders(["cookie"]),
    })
  }

  return {
    addLike,
    removeLike,
  }
}
