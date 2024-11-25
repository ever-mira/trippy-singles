import type { Database } from "../../types/database.types"

export function useUser() {
  const username = useState<string | null>("username", () => null)
  const displayname = useState<string | null>("displayname", () => null)
  const avatar_url = useState<string | null>("avatar_url", () => null)

  const supabase = useSupabaseClient()
  const supabaseUser = useSupabaseUser()

  async function fetchUsername() {
    if (!supabaseUser.value) {
      username.value = null
      return
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, displayname, avatar_url")
        .eq("id", supabaseUser.value.id)
        .single()

      if (error) throw error
      username.value = data?.username || null
      displayname.value = data?.displayname || null
      avatar_url.value = data?.avatar_url || null
    } catch (err) {
      username.value = null
    }
  }

  function clearUsername() {
    username.value = null
  }

  return {
    username,
    displayname,
    avatar_url,
    fetchUsername,
    clearUsername,
  }
}
