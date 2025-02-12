import { useUser } from "~/composables/useUser"

export default defineNuxtPlugin(() => {
  const { fetchUserData, clearUserData } = useUser()
  const supabase = useSupabaseClient()

  let lastUserId: string | null = null

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
      if (session.user.id !== lastUserId) {
        lastUserId = session.user.id
        await fetchUserData()
      }
    } else if (event === "SIGNED_OUT") {
      clearUserData()
    }
  })
})
