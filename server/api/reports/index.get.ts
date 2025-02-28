import { defineEventHandler } from "h3"
import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const { drug_id, user_id, long_term } = getQuery(event)

  try {
    const query = supabase.from("trip_reports").select(
      `
      id,
      title,
      drug_id,
      drugs (name),
      set,
      setting,
      text,
      avatar_url,
      user_id,
      created_at,
      long_term,
      profiles (
        username
      )
    `
    )

    if (drug_id) query.eq("drug_id", drug_id)
    if (user_id) query.eq("user_id", user_id)
    if (long_term && long_term === "only") query.eq("long_term", true)
    if (long_term && long_term === "without") query.eq("long_term", false)

    query.order("created_at")

    const { data, error } = await query

    if (error) {
      throw new Error("Fehler beim Laden der Reports: " + error.message)
    }

    return data
  } catch (error: any) {
    throw error
  }
})
