import { NextResponse } from "next/server";

// Lib
import { propertyStatus } from "@/lib/constant";
import { createClient } from "@/lib/supabase/server";
// Types
import type { PropertyStatus } from "@/types/Property.type";

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

  const statusCountQueries = propertyStatus.map((status) =>
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", status),
  );

  // Count all properties and each canonical workflow status in parallel.
  const [totalResult, ...statusResults] = await Promise.all([
    supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id),
    ...statusCountQueries,
  ]);

  const failedResult = [totalResult, ...statusResults].find(
    (result) => result.error,
  );

  if (failedResult?.error) {
    return NextResponse.json(
      { message: failedResult.error.message },
      { status: 500 },
    );
  }

  const statusCounts = Object.fromEntries(
    propertyStatus.map((status, index) => [
      status,
      statusResults[index]?.count ?? 0,
    ]),
  ) as Record<PropertyStatus, number>;

  const stats = {
    total: totalResult.count ?? 0,
    needsAction: statusCounts.saved + statusCounts.contacted,
    viewingScheduled: statusCounts.viewing_scheduled,
    shortlisted: statusCounts.shortlisted,
    statusCounts,
  };

  return NextResponse.json(stats);
}
