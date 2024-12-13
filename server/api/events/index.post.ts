import { defineEventHandler, readBody } from "h3"
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const { name, description, website, date, location, avatar_url } = await readBody(event)

  try {
    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)

    if (!user) {
      throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" })
    }
    const userId = user.id

    const { data, error } = await client
      .from("events")
      .insert({
        name,
        description,
        website,
        date,
        location,
        avatar_url,
        user_id: userId,
      })
      .select("*")

    if (error) {
      throw error
    }
    return data
  } catch (error: any) {
    throw error
  }
})
