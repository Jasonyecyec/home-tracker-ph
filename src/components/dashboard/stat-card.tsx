import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
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
  iconColor = "text-primary",
  iconBgColor = "bg-primary/10",
}: StatCardProps) {
  return (
    <Card className="group relative overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {title}
          </CardTitle>
          <div
            className={`p-3 rounded-xl ${iconBgColor} group-hover:scale-110 transition-transform duration-300 shadow-sm`}
          >
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="text-4xl font-bold tracking-tight bg-linear-to-br from-foreground to-foreground/70 bg-clip-text">
            {value}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground/80 font-medium">
              {description}
            </p>
          )}
        </CardContent>
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 ${iconBgColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
      />
    </Card>
  );
}

export function StatCardSkeleton() {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-muted/10" />
      <div className="relative">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-11 w-11 rounded-xl" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-3 w-36" />
        </CardContent>
      </div>
    </Card>
  );
}
