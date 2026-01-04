import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { propertySchema } from "@/schemas/property.schema";
import { uploadImageToSupabase, getImageUrl } from "@/lib/storage";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ message: error.message }, { status: 500 });

  // Add image URLs to each property
  const propertiesWithImages = await Promise.all(
    (data || []).map(async (property) => {
      if (property.image) {
        property.image = await getImageUrl(supabase, property.image);
      }
      return property;
    }),
  );

  return NextResponse.json(propertiesWithImages);
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }

  const formData = await request.formData();
  const imageEntry = formData.get("image");

  const toOptionalString = (value: FormDataEntryValue | null) => {
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    return trimmed.length ? trimmed : undefined;
  };
  const toStringValue = (value: FormDataEntryValue | null) =>
    typeof value === "string" ? value : undefined;

  const payload = {
    url_link: toStringValue(formData.get("url_link")),
    property_name: toOptionalString(formData.get("property_name")),
    address: toOptionalString(formData.get("address")),
    location: toStringValue(formData.get("location")),
    property_type: toStringValue(formData.get("property_type")),
    rent_price: toStringValue(formData.get("rent_price")),
    status: toStringValue(formData.get("status")),
    notes: toOptionalString(formData.get("notes")),
    contact: toOptionalString(formData.get("contact")),
    image:
      imageEntry instanceof File && imageEntry.size > 0 ? imageEntry : null,
  };

  const parsed = propertySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  // Handle image upload to storage
  let imagePath: string | null = null;

  if (parsed.data.image instanceof File) {
    const uploadResult = await uploadImageToSupabase(
      supabase,
      parsed.data.image,
    );

    if (!uploadResult.success) {
      return NextResponse.json(
        { error: `Image upload failed: ${uploadResult.error}` },
        { status: 500 },
      );
    }

    imagePath = uploadResult.filePath ?? null;
  }

  const { data, error } = await supabase
    .from("properties")
    .insert([
      {
        user_id: user.id,
        url_link: parsed.data.url_link,
        property_name: parsed.data.property_name ?? null,
        address: parsed.data.address ?? null,
        location: parsed.data.location,
        property_type: parsed.data.property_type,
        rent_price: parsed.data.rent_price,
        status: parsed.data.status,
        notes: parsed.data.notes ?? null,
        contact: parsed.data.contact ?? null,
        image: imagePath,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
