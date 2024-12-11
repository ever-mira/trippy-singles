import { defineEventHandler } from "h3"
import { serverSupabaseClient } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event)

  try {
    const { data, error } = await supabase
      .from("events")
      .select("id, name, description, date, location, avatar_url, website, user_id, created_at")

    if (error) {
      throw new Error("Fehler beim Laden des Events: " + error.message)
    }

    return data
  } catch (error: any) {
    throw error
  }
})
