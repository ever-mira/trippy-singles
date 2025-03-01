import { defineEventHandler, readBody } from "h3"
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const hint_name = getRouterParam(event, "hint_name")

  if (!hint_name) {
    throw new Error("No hint name provided")
  }

  const { text } = await readBody(event)

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

    const { data, error } = await client.from("hint_comments").insert({
      hint_name: hint_name,
      text,
      user_id: userId,
    })

    if (error) {
      throw error
    }
  } catch (error: any) {
    throw error
  }
})
