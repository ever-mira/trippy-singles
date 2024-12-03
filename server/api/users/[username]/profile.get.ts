import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const username = getRouterParam(event, "username")

  if (!username) {
    throw new Error("No username provided")
  }

  const supabase = await serverSupabaseClient(event)

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("user_id, username, website, avatar_url")
      .eq("username", username)

    if (error) throw error

    if (data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Profile not found.",
      })
    }

    return data[0]
  } catch (error: any) {
    throw error
  }
})
