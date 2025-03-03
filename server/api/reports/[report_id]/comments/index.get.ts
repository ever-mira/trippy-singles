import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const report_id = getRouterParam(event, "report_id")

  if (!report_id) {
    throw new Error("No report id provided")
  }

  const supabase = await serverSupabaseClient(event)

  try {
    const { data, error } = await supabase
      .from("trip_report_comments")
      .select(
        "id, text, created_at, user_id, profiles(username, avatar_url), liked_by:trip_report_comment_likes(user_id, profiles(username))"
      )
      .eq("trip_report_id", report_id)

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
