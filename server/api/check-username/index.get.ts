import { serverSupabaseClient } from "#supabase/server"
import { validateUsername } from "@utils/usernameValidation"

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const username = query.username?.toString()

  if (!username) {
    throw createError({
      statusCode: 400,
      statusMessage: "Username fehlt.",
    })
  }

  const { valid, errors } = validateUsername(username)

  if (!valid) {
    throw createError({
      statusCode: 400,
      statusMessage: "Username ungültig.",
      message: errors.join(" "),
    })
  }

  const supabase = await serverSupabaseClient(event)

  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .ilike("username", username.toLowerCase())
    .limit(1)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Interner Serverfehler.",
    })
  }

  const isAvailable = data.length === 0

  return {
    available: isAvailable,
  }
})
