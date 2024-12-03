import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const roomid = getRouterParam(event, "roomid")

  if (!roomid) {
    throw new Error("No room id provided")
  }

  const supabase = await serverSupabaseClient(event)

  try {
    const { data, error } = await supabase
      .from("chatmessages")
      .select("id, content, created_at, profiles(username, avatar_url)")
      .eq("chatroom_id", roomid)

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
