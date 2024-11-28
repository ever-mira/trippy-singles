import { defineEventHandler, readBody } from "h3"
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const roomid = getRouterParam(event, "roomid")

  const { content } = await readBody(event)

  try {
    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)

    if (!user) {
      throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" })
    }
    const userId = user.id

    const { data, error } = await client.from("chatmessages").insert({
      chatroom_id: roomid,
      content: content,
      user_id: userId,
    })

    if (error) {
      throw error
    }
  } catch (error: any) {
    throw error
  }
})
