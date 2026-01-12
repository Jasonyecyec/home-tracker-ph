import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

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
  const [totalResult, pendingResult, reviewedResult, rejectedResult] =
    await Promise.all([
      supabase
        .from("properties")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("properties")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("status", "pending"),
      supabase
        .from("properties")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("status", "reviewed"),
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
    pending: pendingResult.count || 0,
    reviewed: reviewedResult.count || 0,
    rejected: rejectedResult.count || 0,
  };

  return NextResponse.json(stats);
}
