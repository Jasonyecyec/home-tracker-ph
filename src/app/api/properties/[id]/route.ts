import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const supabase = await createClient();

  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "Property ID is required" },
      { status: 400 },
    );
  }

  // Find property to delete
  const { data: property, error: checkError } = await supabase
    .from("properties")
    .select()
    .eq("id", id)
    .single();

  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 });
  }

  // Remove image from storage if exists
  if (property.image) {
    const { error: storageError } = await supabase.storage
      .from(process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "")
      .remove([property.image]);

    if (storageError) {
      console.error("Storage deletion failed:", storageError);
    }
  }

  // Delete property
  const { error: deleteError } = await supabase
    .from("properties")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "Property deleted successfully" },
    { status: 200 },
  );
}
