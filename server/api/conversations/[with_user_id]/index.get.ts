import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"

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

  const supabase = await serverSupabaseClient(event)

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(
      `and(sender_id.eq.${userId},receiver_id.eq.${withUserId}),and(sender_id.eq.${withUserId},receiver_id.eq.${userId})`
    )
    .order("created_at", { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
})
