import type { ExtendedLike } from "~~/types/extended.types"

export default function useLikes(reportId: string) {
  const likes = useState<Array<ExtendedLike>>("trip_report_likes", () => [])
  const likesCount = useState<number>("trip_report_likes_count", () => 0)

  const loadLikes = async () => {
    const { data } = await useFetch<ExtendedLike[]>(`/api/reports/${reportId}/likes`, {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    })
    if (data.value) {
      likes.value = data.value
      likesCount.value = likes.value.length
    }
  }

  const addLike = async () => {
    await $fetch(`/api/reports/${reportId}/likes`, {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
    })
  }

  const removeLike = async () => {
    await $fetch(`/api/reports/${reportId}/likes`, {
      method: "DELETE",
      headers: useRequestHeaders(["cookie"]),
    })
  }

  return {
    likes,
    likesCount,
    loadLikes,
    addLike,
    removeLike,
  }
}
