import { defineEventHandler } from "h3"
import { serverSupabaseClient } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event)

  const { lon, lat } = await getQuery(event)

  try {
    if (lat && lon) {
      const { data, error } = await supabase.rpc("get_profiles_with_distance", {
        lon: Number(lon),
        lat: Number(lat),
      })

      if (error) {
        throw new Error("Fehler beim Laden der User: " + error.message)
      }

      return data
    } else {
      const { data, error } = await supabase
        .from("profiles")
        .select("user_id, username, avatar_url, location_label")
        .order("created_at", { ascending: false })
        .limit(25)

      if (error) {
        throw new Error("Fehler beim Laden der User: " + error.message)
      }

      return data
    }
  } catch (error: any) {
    throw error
  }
})
