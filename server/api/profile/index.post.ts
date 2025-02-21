import { defineEventHandler, readBody } from "h3"
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const client = await serverSupabaseClient<Database>(event)
    const user = await serverSupabaseUser(event)

    if (!user) {
      throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" })
    }

    const updateData = {
      ...body,
      updated_at: new Date().toISOString(),
    }

    const { error } = await client.from("profiles").update(updateData).eq("user_id", user.id)

    if (error) {
      throw error
    }
  } catch (error: any) {
    throw error
  }
})
