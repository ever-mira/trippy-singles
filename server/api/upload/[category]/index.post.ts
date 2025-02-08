import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server"
import type { Database } from "~~/types/database.types"
import { fileTypeFromBuffer } from "file-type"

export default defineEventHandler(async (event) => {
  const multipartData = await readMultipartFormData(event)

  if (!multipartData) {
    throw createError({ statusCode: 400, statusMessage: "Keine Formulardaten übermittelt" })
  }

  const filePart = multipartData.find((part) => part.name === "photo")

  if (!filePart) {
    throw createError({ statusCode: 400, statusMessage: "Daten fehlen" })
  }

  const category = getRouterParam(event, "category")
  const validCategories = ["avatar", "event", "place", "report"]

  if (!category || !validCategories.includes(category)) {
    throw createError({ statusCode: 400, statusMessage: "invalid category" })
  }

  const user = await serverSupabaseUser(event)

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" })
  }

  const userId = user.id

  const file = filePart.data
  const originalFilename = filePart.filename || "file"

  const extension = originalFilename.split(".").pop()

  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"]
  if (!extension || !allowedExtensions.includes(extension.toLowerCase())) {
    throw createError({ statusCode: 400, statusMessage: "Ungültiges Dateiformat" })
  }

  const fileType = await fileTypeFromBuffer(file).then((result: any) => result?.mime)

  const fileName = `user_${userId}/${Date.now()}_${Math.random()
    .toString(36)
    .slice(2)}.${extension}`

  const client = await serverSupabaseClient<Database>(event)

  const bucketName = category === "avatar" ? "avatars" : `${category}_photos`

  const { data: uploadData, error: uploadError } = await client.storage
    .from(bucketName)
    .upload(fileName, file, {
      cacheControl: "31536000, immutable",
      upsert: true,
      contentType: fileType,
    })

  if (uploadError) {
    throw createError({ statusCode: 500, statusMessage: uploadError.message })
  }

  const publicUrl = client.storage.from(bucketName).getPublicUrl(fileName).data.publicUrl

  if (category === "avatar") {
    const { error: updateError } = await client
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("user_id", userId)

    if (updateError) {
      throw createError({ statusCode: 500, statusMessage: updateError.message })
    }
  }

  return { url: publicUrl }
})
