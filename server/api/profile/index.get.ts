import { defineEventHandler, getQuery } from "h3"
import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  const { userId } = getQuery(event)

  if (!userId) {
    throw new Error("No user ID provided")
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("username, website, avatar_url")
      .eq("user_id", userId)
      .single()

    if (error) throw error

    return data
  } catch (error: any) {
    throw error
  }
})
