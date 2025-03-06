import type { ExtendedComment } from "~~/types/extended.types"

export async function useComments(category: string | null, resourceId: string) {
  const comments = useState<Array<ExtendedComment> | null>(`${category}Comments`, () => [])
  const newComment = useState<string>(`${category}${resourceId}NewComment`, () => "")

  const { showModal } = useModal()
  const user = useSupabaseUser()

  async function loadComments() {
    const { data } = await useFetch<Array<ExtendedComment>>(
      `/api/${category}/${resourceId}/comments`,
      {
        method: "GET",
        headers: useRequestHeaders(["cookie"]),
      }
    )
    if (data.value) comments.value = data.value
  }

  async function saveComment(parent_id?: number) {
    if (!user.value) {
      showModal("Du musst eingeloggt sein, um Kommentare erstellen zu können.")
      return
    }

    if (newComment.value.length < 1) return

    try {
      await $fetch(`/api/${category}/${resourceId}/comments`, {
        method: "POST",
        headers: useRequestHeaders(["cookie"]),
        body: JSON.stringify({
          text: newComment.value,
          parent_id: parent_id,
        }),
      })
      newComment.value = ""
      await loadComments()
    } catch (error: any) {}
  }

  async function deleteComment(commentId: number) {
    try {
      await $fetch(`/api/${category}/${resourceId}/comments/${commentId}`, {
        method: "DELETE",
        headers: useRequestHeaders(["cookie"]),
      })
      await loadComments()
    } catch (error: any) {}
  }

  await loadComments()

  return {
    loadComments,
    saveComment,
    comments,
    newComment,
    deleteComment,
  }
}
