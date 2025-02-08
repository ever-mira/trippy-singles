import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "report_id")

  if (!id) {
    throw new Error("No id provided")
  }

  const supabase = await serverSupabaseClient(event)

  try {
    const { data, error } = await supabase
      .from("trip_reports")
      .select(
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
        profiles (
          username
        )
      `
      )
      .eq("id", id)

    if (error) throw error

    if (data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Report not found.",
      })
    }

    return data[0]
  } catch (error: any) {
    throw error
  }
})
