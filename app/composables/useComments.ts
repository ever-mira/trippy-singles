import type { ExtendedComment } from "~~/types/extended.types"

export async function useComments(category: string, resourceId: string) {
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

  async function saveComment() {
    if (!user.value) {
      showModal("Du musst eingeloggt sein, um Kommentare erstellen zu können.")
      return
    }

    if (newComment.value.length < 1) return

    await useFetch(`/api/${category}/${resourceId}/comments`, {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
      body: JSON.stringify({ text: newComment.value }),
    })
    newComment.value = ""
    await loadComments()
  }

  await loadComments()

  return {
    loadComments,
    saveComment,
    comments,
    newComment,
  }
}
