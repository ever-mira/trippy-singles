import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { Database } from "../../../types/database.types";
import { lookup, extension } from "mime-types";
import { fileTypeFromBuffer } from "file-type";

export default defineEventHandler(async (event) => {
  const multipartData = await readMultipartFormData(event);

  if (!multipartData) {
    throw createError({ statusCode: 400, statusMessage: "Keine Formulardaten übermittelt" });
  }

  const filePart = multipartData.find((part) => part.name === "photo");

  if (!filePart) {
    throw createError({ statusCode: 400, statusMessage: "Daten fehlen" });
  }

  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Nicht authentifiziert" });
  }

  const userId = user.id;

  const file = filePart.data;
  const originalFilename = filePart.filename || "file";

  const extension = originalFilename.split(".").pop();

  const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
  if (!extension || !allowedExtensions.includes(extension.toLowerCase())) {
    throw createError({ statusCode: 400, statusMessage: "Ungültiges Dateiformat" });
  }

  console.log("filname:", originalFilename);
  const mimeType = lookup(originalFilename) || "application/octet-stream";
  const fileType = await fileTypeFromBuffer(file).then((result: any) => result?.mime);
  console.log("mime type:", mimeType);
  console.log("file type:", fileType);

  const fileName = `user_${userId}/${Date.now()}_${Math.random()
    .toString(36)
    .slice(2)}.${extension}`;

  const client = await serverSupabaseClient<Database>(event);

  const { data: uploadData, error: uploadError } = await client.storage
    .from("avatars")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: fileType,
    });

  if (uploadError) {
    throw createError({ statusCode: 500, statusMessage: uploadError.message });
  }

  const publicUrl = client.storage.from("avatars").getPublicUrl(fileName).data.publicUrl;

  const { error: updateError } = await client
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", userId);

  if (updateError) {
    throw createError({ statusCode: 500, statusMessage: updateError.message });
  }

  return { url: publicUrl };
});
