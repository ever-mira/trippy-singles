import { defineEventHandler } from "h3"
import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  try {
    const { data, error } = await supabase.from("profiles").select("user_id, username, avatar_url")

    if (error) {
      throw new Error("Fehler beim Laden der User: " + error.message)
    }

    return data
  } catch (error: any) {
    throw error
  }
})
