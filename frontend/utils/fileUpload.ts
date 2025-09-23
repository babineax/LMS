import * as FileSystemLegacy from 'expo-file-system/legacy';
import { supabase } from "@/libs/supabase";

function uriToBlob(base64: string) {
  const binary = global.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  console.log("starting to convert");
  return bytes;
}

export async function uploadFile(uri: string, fileName: string): Promise<string | null> {
  try {
    const base64 = await FileSystemLegacy.readAsStringAsync(uri, {
      encoding: FileSystemLegacy.EncodingType.Base64,
    });
    // Convert local URI to a Blob for Supabase
    const blob = await uriToBlob(base64);

    // Determine content type
    const fileExt = fileName.split('.').pop()?.toLowerCase();
    let contentType = 'application/octet-stream';
    
    if (fileExt === 'jpg' || fileExt === 'jpeg') contentType = 'image/jpeg';
    else if (fileExt === 'png') contentType = 'image/png';
    else if (fileExt === 'pdf') contentType = 'application/pdf';
    else if (fileExt === 'doc') contentType = 'application/msword';
    else if (fileExt === 'docx') contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    // Upload the blob
    const { data, error } = await supabase.storage
      .from("course_content") 
      .upload(fileName, blob, {
        cacheControl: "3600",
        upsert: false,
        contentType,
      });

    if (error) throw error;

    // Make it public and get URL
    const { data: publicUrlData } = supabase.storage
      .from("course_content")
      .getPublicUrl(fileName);

    console.log("Upload result:", { data, error });
    console.log("Public URL:", publicUrlData.publicUrl);
    return publicUrlData.publicUrl; 
  } catch (err: any) {
    console.error("Upload failed:", err.message, err);
    return null;
  }
}


