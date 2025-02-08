import { defineEventHandler } from "h3"
import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  try {
    const { data, error } = await supabase.from("drugs").select("id, name").order("name")

    if (error) {
      throw new Error("Fehler beim Laden der Drugs: " + error.message)
    }

    return data
  } catch (error: any) {
    throw error
  }
})
