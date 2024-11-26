import { useUser } from "~/composables/useUser"

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.client) return
  const { fetchUsername } = useUser()
  await fetchUsername()
})
