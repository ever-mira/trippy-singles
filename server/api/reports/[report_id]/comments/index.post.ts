import { defineEventHandler, readBody } from "h3"
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const report_id = getRouterParam(event, "report_id")

  if (!report_id) {
    throw new Error("No report id provided")
  }

  const { text, parent_id } = await readBody(event)

  try {
    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)

    if (!user) {
      throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" })
    }
    const userId = user.id

    if (text.length > 500) {
      throw createError({ statusCode: 400, statusMessage: "Kommentar zu lang" })
    }

    const { data, error } = await client.from("trip_report_comments").insert({
      trip_report_id: Number(report_id),
      text,
      user_id: userId,
      parent_id: parent_id || null,
    })

    if (error) {
      throw error
    }
  } catch (error: any) {
    throw error
  }
})
