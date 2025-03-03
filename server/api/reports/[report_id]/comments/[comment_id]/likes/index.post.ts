import { defineEventHandler, readBody } from "h3"
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const comment_id = getRouterParam(event, "comment_id")

  if (!comment_id) {
    throw new Error("No comment id provided")
  }

  try {
    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)

    if (!user) {
      throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" })
    }

    const { error } = await client.from("trip_report_comment_likes").insert({
      comment_id: Number(comment_id),
    })

    if (error) {
      throw error
    }
  } catch (error: any) {
    throw error
  }
})
