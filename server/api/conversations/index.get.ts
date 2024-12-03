import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event)

  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" })
  }

  const userId = user.id

  const { data, error } = await supabase.rpc("get_conversations", { for_user_id: userId })

  if (error) {
    throw new Error(error.message)
  }

  return data
})
