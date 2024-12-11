import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")

  if (!id) {
    throw new Error("No id provided")
  }

  const supabase = await serverSupabaseClient(event)

  try {
    const { data, error } = await supabase
      .from("events")
      .select("id, name, description, date, location, avatar_url, website, user_id, created_at")
      .eq("id", id)

    if (error) throw error

    if (data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Event not found.",
      })
    }

    return data[0]
  } catch (error: any) {
    throw error
  }
})
