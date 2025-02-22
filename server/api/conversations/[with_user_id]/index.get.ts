import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const withUserId = getRouterParam(event, "with_user_id")

  if (!withUserId) {
    throw new Error("User ID is required")
  }

  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" })
  }

  const userId = user.id

  const supabase = await serverSupabaseClient<Database>(event)

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(
      `and(sender_id.eq.${userId},receiver_id.eq.${withUserId}),and(sender_id.eq.${withUserId},receiver_id.eq.${userId})`
    )
    .order("created_at", { ascending: false })
    .limit(50)

  if (error) {
    throw new Error(error.message)
  }

  const { error: updateReadError } = await supabase
    .from("messages")
    .update({ read: true })
    .eq("receiver_id", userId)
    .eq("sender_id", withUserId)
    .eq("read", false)

  if (updateReadError) {
    throw new Error(updateReadError.message)
  }

  return data.reverse()
})
