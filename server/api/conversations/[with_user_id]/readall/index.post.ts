import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const withUserId = getRouterParam(event, "with_user_id")

  if (!withUserId) {
    throw new Error("Missing required fields")
  }

  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" })
  }

  const client = await serverSupabaseClient<Database>(event)
  const { error } = await client
    .from("messages")
    .update({ read: true })
    .eq("receiver_id", user.id)
    .eq("sender_id", withUserId)
    .eq("read", false)

  if (error) {
    throw new Error(error.message)
  }
})
