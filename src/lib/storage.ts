import type { SupabaseClient } from "@supabase/supabase-js";

interface UploadImageResult {
  success: boolean;
  fileName?: string;
  error?: string;
}

export async function uploadImageToSupabase(
  supabase: SupabaseClient,
  file: File,
  folder = "properties",
): Promise<UploadImageResult> {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "")
      .upload(filePath, file);

    if (uploadError) {
      return {
        success: false,
        error: uploadError.message,
      };
    }

    return {
      success: true,
      fileName,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown upload error",
    };
  }
}

export async function deleteImage(
  supabase: SupabaseClient,
  fileName: string,
  folder = "properties",
): Promise<{ success: boolean; error?: string }> {
  try {
    const filePath = `${folder}/${fileName}`;

    const { error: deleteError } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "")
      .remove([filePath]);

    if (deleteError) {
      return {
        success: false,
        error: deleteError.message,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown delete error",
    };
  }
}

export async function getImageUrl(
  supabase: SupabaseClient,
  fileName: string,
  folder = "properties",
  expiration = 3600,
): Promise<string> {
  const filePath = `${folder}/${fileName}`;
  const { data } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "")
    .createSignedUrl(filePath, expiration); // 1 hour expiration

  return data?.signedUrl || "";
}
