import { defineEventHandler } from "h3"
import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" })
  }
  const userId = user.id

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
