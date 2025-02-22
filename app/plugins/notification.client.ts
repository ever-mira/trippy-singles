import type { Tables } from "~~/types/database.types"
type Message = Tables<"messages">

export default defineNuxtPlugin(async (nuxtApp) => {
  const supabase = useSupabaseClient()
  const { fetchUnreadConversationCount } = useConversations()
  const { fetchConversations, getCurrentConversation } = useConversations()
  const route = useRoute()

  const user = useSupabaseUser()
  if (!user.value) return

  const channel = supabase.channel("messages")
  channel
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      async (payload) => {
        const currentConversation = getCurrentConversation()
        if (currentConversation && payload.new.sender_id === currentConversation.userId) {
          currentConversation.addMessage(payload.new as Message)
          currentConversation.markAsReadAll()
        } else {
          fetchUnreadConversationCount()
        }
        if (route.path === "/conversations") {
          fetchConversations()
        }
      }
    )
    .subscribe()
})
