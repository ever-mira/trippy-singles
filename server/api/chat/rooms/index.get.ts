import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  try {
    const { data, error } = await supabase.from("chatrooms").select("id, name, slug, created_at")

    if (error) {
      throw new Error("Fehler beim Laden der Chatrooms: " + error.message)
    }

    return data
  } catch (error: any) {
    throw error
  }
})
