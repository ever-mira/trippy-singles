import { serverSupabaseClient } from "#supabase/server"

export default defineEventHandler(async (event) => {
  const roomid = getRouterParam(event, "roomid")

  if (!roomid) {
    throw new Error("No room id provided")
  }

  const supabase = await serverSupabaseClient(event)

  try {
    const { data, error } = await supabase
      .from("chatrooms")
      .select("id, name, created_at")
      .eq("id", roomid)

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      })
    }

    if (data.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Chatroom not found.",
      })
    }

    return data[0]
  } catch (error: any) {
    throw error
  }
})
