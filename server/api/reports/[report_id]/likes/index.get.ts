import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const report_id = getRouterParam(event, "report_id")

  if (!report_id) {
    throw new Error("No report id provided")
  }

  const supabase = await serverSupabaseClient(event)

  try {
    const { data, error } = await supabase
      .from("trip_report_likes")
      .select("id, created_at, user_id, profiles(username, avatar_url)")
      .eq("trip_report_id", report_id)
      .order("created_at", { ascending: false })

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
