// Types
import type { PropertyStatus } from "@/types/Property.type";

export interface DashboardStats {
  total: number;
  needsAction: number;
  viewingScheduled: number;
  shortlisted: number;
  statusCounts: Record<PropertyStatus, number>;
}
