import type { Database } from "~~/types/database.types"
type ConversationItem = Database["public"]["Functions"]["get_conversations"]["Returns"][number]

const currentConversation = ref<ReturnType<typeof useMessages> | null>(null)

export default function useConversations() {
  const conversations = useState<Array<ConversationItem>>(
    "Conversations",
    () => new Array<ConversationItem>()
  )
  const unreadConversationCount = useState<number>("unreadConversationCountField", () => 0)

  const fetchConversations = async () => {
    const { data } = await useFetch(`/api/conversations/`, {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    })

    if (data.value) conversations.value = data.value
  }

  const fetchUnreadConversationCount = async () => {
    const { data } = await useFetch<number>(`/api/conversations/unreadcount`, {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    })

    unreadConversationCount.value = Number(data.value)
  }

  const setCurrentConversation = (conversation: ReturnType<typeof useMessages> | null) => {
    currentConversation.value = conversation
  }

  const getCurrentConversation = () => {
    return currentConversation.value
  }

  return {
    fetchConversations,
    fetchUnreadConversationCount,
    conversations,
    unreadConversationCount,
    setCurrentConversation,
    getCurrentConversation,
  }
}
