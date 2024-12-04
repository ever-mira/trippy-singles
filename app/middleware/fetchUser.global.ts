import { useUser } from "~/composables/useUser"

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.client) return
  const { fetchUserData } = useUser()
  await fetchUserData()
})
