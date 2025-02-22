import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event)

  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" })
  }

  const { data, error } = await supabase.rpc("count_unread_conversations", {
    user_id: user.id,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
})
