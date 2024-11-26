import { defineEventHandler } from "h3"
import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  try {
    const { data, error } = await supabase
      .from("places")
      .select("id, name, description, avatar_url, website, user_id, created_at")

    if (error) {
      throw new Error("Fehler beim Laden der Places: " + error.message)
    }

    return data
  } catch (error: any) {
    throw error
  }
})
