import { defineEventHandler, readBody } from "h3"
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const { name, description, website } = await readBody(event)

  try {
    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)

    if (!user) {
      throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" })
    }
    const userId = user.id

    const { data, error } = await client
      .from("places")
      .insert({
        name,
        description,
        website,
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
