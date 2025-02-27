import type { Tables } from "~~/types/database.types"
type Profile = Tables<"profiles">
type Message = Tables<"messages">

export default function useMessages(userId: string) {
  const messages = useState<Message[]>("conversationMessages", () => new Array<Message>())
  const message = useState<string>(`conversation${userId}Message`, () => "")

  const { fetchUnreadConversationCount } = useConversations()
  const supabase = useSupabaseClient()
  const user: Ref = useSupabaseUser()
  const { showModal } = useModal()

  async function fetchMessages() {
    const { data } = await useFetch<Message[]>(`/api/conversations/${userId}`, {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    })

    if (data.value) {
      messages.value = data.value
    }

    await fetchUnreadConversationCount()
  }

  // async function listenToNewMessages() {
  //   const channel = supabase.channel("messages")
  //   channel
  //     .on(
  //       "postgres_changes",
  //       { event: "INSERT", schema: "public", table: "messages" },
  //       async (payload) => {
  //         if (payload.new.sender_id === userId && messages.value) {
  //           messages.value.push(payload.new as Message)
  //           await markAsReadAll()
  //           await fetchUnreadConversationCount()
  //         }
  //       }
  //     )
  //     .subscribe()
  //   onBeforeUnmount(() => {
  //     supabase.removeChannel(channel)
  //   })
  // }

  const sendMessage = async () => {
    if (!user.value) {
      showModal("Du musst eingeloggt sein, um Nachrichten senden zu können.")
      return
    }
    if (message.value.length < 1) {
      return
    }
    const response: any = await $fetch(`/api/conversations/${userId}`, {
      method: "POST",
      body: { content: message.value },
    })

    if (response.success) {
      messages.value?.push(response.data[0] as Message)
      await nextTick()
      message.value = ""
    }
  }

  const addMessage = (message: Message) => {
    messages.value.push(message)
  }

  async function markAsReadAll() {
    await $fetch(`/api/conversations/${userId}/readall`, {
      method: "POST",
    })
  }

  return {
    messages,
    fetchMessages,
    sendMessage,
    message,
    addMessage,
    userId,
    markAsReadAll,
  }
}
