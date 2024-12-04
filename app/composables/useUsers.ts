import type { Tables } from "~~/types/database.types"
type Profile = Tables<"profiles">

export function useUsers() {
  const users = useState<Profile[] | null>("users", () => null)

  function setUsers(newUsers: Profile[]) {
    users.value = newUsers
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
    setUsers,
    updateUserList,
  }
}
