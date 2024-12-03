import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const receiver_id = getRouterParam(event, "with_user_id")

  const { content } = await readBody(event)

  if (!receiver_id || !content) {
    throw new Error("Missing required fields")
  }

  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" })
  }

  const sender_id = user.id

  const client = await serverSupabaseClient<Database>(event)

  const { data, error } = await client
    .from("messages")
    .insert([{ sender_id, receiver_id, content }])

  if (error) {
    throw new Error(error.message)
  }

  return { success: true, data }
})
