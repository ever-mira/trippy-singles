import type { RealtimeChannel } from "@supabase/supabase-js"
import type { Tables } from "~~/types/database.types"
type Message = Tables<"messages">

export default defineNuxtPlugin(async (nuxtApp) => {
  const supabase = useSupabaseClient()
  const { fetchUnreadConversationCount } = useConversations()
  const { fetchConversations, getCurrentConversation } = useConversations()
  const route = useRoute()

  const user = useSupabaseUser()
  if (!user.value) return

  let channel: RealtimeChannel

  const connectChannel = () => {
    channel = supabase.channel("messages")
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
  }

  await connectChannel()

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      console.log("Tab wieder sichtbar. Überprüfe Verbindung...", new Date().toISOString())
      if (channel.state !== "joined") {
        console.log("reconnect")
        reconnectChannel()
        fetchUnreadConversationCount()
      }
    }
  })

  async function reconnectChannel() {
    try {
      await channel.unsubscribe()
      await supabase.removeChannel(channel)
      connectChannel()
      console.log("Erneut verbunden")
    } catch (error) {
      console.error("Fehler beim Reconnect:", error)
    }
  }
})
