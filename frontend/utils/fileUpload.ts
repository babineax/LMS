import * as FileSystemLegacy from 'expo-file-system/legacy';

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);

function uriToBlob(base64: string) {
  const binary = global.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function uploadFile(uri: string, fileName: string): Promise<string | null> {
  try {
    const base64 = await FileSystemLegacy.readAsStringAsync(uri, {
      encoding: FileSystemLegacy.EncodingType.Base64,
    });
    // Convert local URI to a Blob for Supabase
    const blob = await uriToBlob(base64);

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


