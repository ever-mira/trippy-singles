import { defineEventHandler, readBody } from "h3"
import { serverSupabaseClient } from "#supabase/server"
import type { Database } from "../../../types/database.types"

export default defineEventHandler(async (event) => {
  const { user_id, username, website, avatar_url } = await readBody(event)

  try {
    const client = await serverSupabaseClient<Database>(event)

    const updated_at = new Date().toISOString()

    const { error } = await client.from("profiles").upsert({
      user_id,
      username,
      website,
      avatar_url,
      updated_at,
    })

    if (error) {
      throw error
    }
  } catch (error: any) {
    throw error
  }
})
