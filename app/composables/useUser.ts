import type { Tables } from "~~/types/database.types"
type Profile = Tables<"profiles">

export function useUser() {
  const profile = useState<Profile | null>("userProfile", () => null)

  const supabaseUser = useSupabaseUser()

  async function fetchUserData() {
    if (!supabaseUser.value) {
      profile.value = null
      return
    }

    try {
      const { data } = await useFetch<Profile>(`/api/profile`, {
        method: "GET",
        headers: useRequestHeaders(["cookie"]),
      })

      if (data.value) {
        profile.value = data.value
      }
    } catch (err) {
      profile.value = null
    }
  }

  function clearUserData() {
    profile.value = null
  }

  return {
    profile,
    fetchUserData,
    clearUserData,
  }
}
