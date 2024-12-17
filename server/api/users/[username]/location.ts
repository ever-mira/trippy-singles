import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const method = event.method
  const username = event.context.params?.username
  const body = await readBody(event)
  const user = await serverSupabaseUser(event)
  const { label, value } = body
  const { geometry, properties } = value

  if (!geometry || !properties || !label) {
    throw createError({ statusCode: 400, message: "Data incomplete" })
  }

  if (!user) {
    throw createError({ statusCode: 400, message: "Not authenticated" })
  }

  const client = await serverSupabaseClient<Database>(event)

  switch (method) {
    case "POST":
    case "PUT":
      const { data, error } = await client.rpc("update_location", {
        p_user_id: user.id,
        lon: geometry.coordinates[0],
        lat: geometry.coordinates[1],
        properties,
        label,
      })
      return
    default:
      throw createError({ statusCode: 405, message: "Method Not Allowed" })
  }
})
