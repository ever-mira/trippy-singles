import { serverSupabaseClient } from "#supabase/server"
import type { Database } from "~~/types/database.types"

export default defineEventHandler(async (event) => {
  const { email, password, username } = await readBody(event)

  if (!email || !password || !username) {
    throw createError({
      statusCode: 400,
      statusMessage: "Daten unvollständig.",
    })
  }

  try {
    const supabase = await serverSupabaseClient<Database>(event)

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (signUpError || !signUpData.user) {
      throw createError({
        statusCode: 500,
        statusMessage: "Interner Serverfehler.",
      })
    }

    const userId = signUpData.user.id

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ username })
      .eq("user_id", userId)

    if (profileError) {
      throw createError({
        statusCode: 500,
        statusMessage: "Interner Serverfehler.",
      })
    }

    return {
      success: true,
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Interner Serverfehler.",
    })
  }
})
