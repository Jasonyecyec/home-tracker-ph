"use client";
// Components
import StatCard, { StatCardSkeleton } from "@/components/dashboard/stat-card";
// Types
import { DashboardStats } from "@/types/Dashboard.type";
// Externals
import { useQuery } from "@tanstack/react-query";
import { Home, Clock, CheckCircle2, XCircle } from "lucide-react";

export default function Dashboard() {
  const { data, isPending, error } = useQuery<DashboardStats>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard");
      if (!response.ok) throw new Error("Failed to fetch dashboard stats");
      return response.json();
    },
  });

  const stats = [
    {
      title: "Total Properties",
      value: data?.total || 0,
      icon: Home,
      description: "All tracked properties",
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-50",
    },
    {
      title: "Pending Review",
      value: data?.pending || 0,
      icon: Clock,
      description: "Awaiting review",
      iconColor: "text-amber-600",
      iconBgColor: "bg-amber-50",
    },
    {
      title: "Reviewed",
      value: data?.reviewed || 0,
      icon: CheckCircle2,
      description: "Approved properties",
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50",
    },
    {
      title: "Rejected",
      value: data?.rejected || 0,
      icon: XCircle,
      description: "Not suitable",
      iconColor: "text-red-600",
      iconBgColor: "bg-red-50",
    },
  ];

  if (error) {
    return (
      <div className="text-destructive text-sm">
        Failed to load statistics. Please try again.
      </div>
    );
  }

  return (
    <div className="p-5 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">
          Overview of your property tracking
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isPending ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          stats.map((stat) => <StatCard key={stat.title} {...stat} />)
        )}
      </div>
    </div>
  );
}
