import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const hint_name = getRouterParam(event, "hint_name")

  if (!hint_name) {
    throw new Error("No hint name provided")
  }

  const supabase = await serverSupabaseClient(event)

  try {
    const { data, error } = await supabase
      .from("hint_comments")
      .select("id, text, created_at, profiles(username, avatar_url)")
      .eq("hint_name", hint_name)

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      })
    }

    return data
  } catch (error: any) {
    throw error
  }
})
