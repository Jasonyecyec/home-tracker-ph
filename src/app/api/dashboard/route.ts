import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // Get user authentication
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

  // Count all properties and by status in parallel
  const [
    totalResult,
    savedResult,
    contactedResult,
    viewingScheduledResult,
    viewedResult,
    shortlistedResult,
    rejectedResult,
  ] = await Promise.all([
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "saved"),
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "contacted"),
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "viewing_scheduled"),
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "viewed"),
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "shortlisted"),
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "rejected"),
  ]);

  if (totalResult.error) {
    return NextResponse.json(
      { message: totalResult.error.message },
      { status: 500 },
    );
  }

  const stats = {
    total: totalResult.count || 0,
    saved: savedResult.count || 0,
    contacted: contactedResult.count || 0,
    viewing_scheduled: viewingScheduledResult.count || 0,
    viewed: viewedResult.count || 0,
    shortlisted: shortlistedResult.count || 0,
    rejected: rejectedResult.count || 0,
  };

  return NextResponse.json(stats);
}
