import type { Tables } from "~~/types/database.types"
type Profile = Tables<"profiles">

type ProfileWithDistance = Profile & {
  distance?: number
}

const selectedLocation = ref()

export function useUsers() {
  const users = useState<ProfileWithDistance[] | null>("users", () => null)

  async function loadUsers() {
    selectedLocation.value = null
    const { data } = await useFetch<Profile[]>(`/api/users/`, {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    })
    if (data.value) users.value = data.value
  }

  async function updateUserList(location?: Array<number>) {
    const params = new URLSearchParams()
    if (location && location.length === 2) {
      const lon = location[0]
      const lat = location[1]
      if (lon && lat) {
        params.append("lon", lon.toString())
        params.append("lat", lat.toString())
      }
    }
    try {
      const newUsers = await $fetch<ProfileWithDistance[]>("/api/users/?" + params.toString())
      users.value = newUsers
    } catch (error) {
      console.error(error)
    }
  }

  return {
    users,
    loadUsers,
    updateUserList,
    selectedLocation,
  }
}
