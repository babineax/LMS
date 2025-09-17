import * as FileSystem from "expo-file-system";

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

async function uriToBlob(uri: string): Promise<Blob> {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/jpeg" }); // or mime type from asset if available
  return blob;
}



export async function uploadFile(uri: string, fileName: string): Promise<string | null> {
  try {
    // Convert local URI to a Blob for Supabase
    const blob = await uriToBlob(uri);

    // Upload the blob
    const { error } = await supabase.storage
      .from("course_content") 
      .upload(fileName, blob, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) throw error;

    // Make it public and get URL
    const { data: publicUrlData } = supabase.storage
      .from("course_content")
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl; 
  } catch (err) {
    console.error("Upload failed:", err);
    return null;
  }
}


