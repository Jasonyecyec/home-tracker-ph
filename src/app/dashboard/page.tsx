"use client";

// Externals
import { useQuery } from "@tanstack/react-query";
import { CalendarClock, Home, ListChecks, Star } from "lucide-react";
// Components
import StatCard, { StatCardSkeleton } from "@/components/dashboard/stat-card";
import PageHeader from "@/components/layout/page-header";
// Types
import type { DashboardStats } from "@/types/Dashboard.type";

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
      value: data?.total ?? 0,
      icon: Home,
      description: "All tracked properties",
      iconColor: "text-brand-ink",
      iconBgColor: "bg-stone-100",
    },
    {
      title: "Needs Action",
      value: data?.needsAction ?? 0,
      icon: ListChecks,
      description: "Saved or contacted",
      iconColor: "text-emerald-700",
      iconBgColor: "bg-emerald-50",
    },
    {
      title: "Viewing Scheduled",
      value: data?.viewingScheduled ?? 0,
      icon: CalendarClock,
      description: "Visits planned",
      iconColor: "text-amber-600",
      iconBgColor: "bg-amber-50",
    },
    {
      title: "Shortlisted",
      value: data?.shortlisted ?? 0,
      icon: Star,
      description: "Best candidates",
      iconColor: "text-green-700",
      iconBgColor: "bg-emerald-50",
    },
  ];

  if (error) {
    return (
      <div className="rounded-2xl border border-brand-border bg-brand-surface p-5 text-sm text-destructive">
        Failed to load statistics. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] space-y-5 rounded-2xl text-brand-ink">
      <PageHeader
        title="Dashboard"
        description="Track what needs action, what is scheduled, and which homes are still worth pursuing."
      />

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isPending
          ? stats.map((stat) => (
              <StatCardSkeleton key={`${stat.title}-skeleton`} />
            ))
          : stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
      </div>
    </div>
  );
}
