import type { Tables } from "~~/types/database.types"
type Profile = Tables<"profiles">

export function useUsers() {
  const users = useState<Profile[] | null>("users", () => null)

  async function loadUsers() {
    const { data } = await useFetch<Profile[]>(`/api/users/`, {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    })
    if (data.value) users.value = data.value
  }

  async function updateUserList() {
    try {
      const newUsers = await $fetch<Profile[]>("/api/users/")
      users.value = newUsers
    } catch (error) {
      console.error(error)
    }
  }

  return {
    users,
    loadUsers,
    updateUserList,
  }
}
