import type { Tables } from "~~/types/database.types"
type Profile = Tables<"profiles">

export default function useProfile() {
  const profile = useState<Profile | null>("profile", () => null)
  const { profile: ownProfile } = useUser()

  const loadProfile = async (username: string) => {
    profile.value = null

    const { data } = await useFetch<Profile>(`/api/users/${username}/profile`, {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    })

    if (data.value) {
      profile.value = data.value
    }
  }

  const isOwnProfile = computed(() => {
    return profile.value?.username === ownProfile.value?.username
  })

  const setAvatarUrl = async (url: string) => {
    if (profile.value) {
      profile.value.avatar_url = url
    }
    if (ownProfile.value && isOwnProfile.value) {
      ownProfile.value.avatar_url = url
    }
  }

  const setLocationLabel = async (label: string) => {
    if (profile.value) {
      profile.value.location_label = label
    }
  }

  return {
    profile,
    loadProfile,
    isOwnProfile,
    setAvatarUrl,
    setLocationLabel,
  }
}
