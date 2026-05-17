// Externals
import type { LucideIcon } from "lucide-react";
// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  iconColor?: string;
  iconBgColor?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
  iconColor = "text-brand-ring",
  iconBgColor = "bg-emerald-50",
}: StatCardProps) {
  return (
    <Card className="group rounded-xl border-stone-200 bg-white py-5 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-stone-300 hover:shadow-md">
      <div>
        <CardHeader className="flex flex-row items-start justify-between space-y-0 px-5 pb-6">
          <CardTitle className="text-sm font-semibold text-brand-muted transition-colors duration-200 group-hover:text-brand-ink-soft">
            {title}
          </CardTitle>
          <div
            className={`rounded-xl p-2.5 ${iconBgColor} transition-colors duration-200`}
          >
            <Icon className={`size-5 ${iconColor}`} aria-hidden="true" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2 px-5">
          <div className="font-mono text-4xl font-semibold tabular-nums tracking-normal text-brand-ink">
            {value}
          </div>
          {description && (
            <p className="text-sm font-medium text-brand-muted">
              {description}
            </p>
          )}
        </CardContent>
      </div>
    </Card>
  );
}

export function StatCardSkeleton() {
  return (
    <Card className="rounded-xl border-stone-200 bg-white py-5 shadow-sm">
      <div className="relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 px-5 pb-6">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-11 w-11 rounded-xl" />
        </CardHeader>
        <CardContent className="space-y-2 px-5">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-3 w-36" />
        </CardContent>
      </div>
    </Card>
  );
}
