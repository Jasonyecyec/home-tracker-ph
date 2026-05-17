// Externals
import {
  Bookmark,
  CalendarClock,
  Check,
  ExternalLink,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Star,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
// Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { propertyStatus } from "@/lib/constant";
import { cn } from "@/lib/utils";
// Types
import type { Property, PropertyStatus } from "@/types/Property.type";
import { Skeleton } from "../ui/skeleton";

interface PropertyCardProps {
  property: Property;
  setSelectedPropertyId: (id: number) => void;
  setIsOpenDialog: (isOpen: boolean) => void;
  handleUpdateStatus: ({ id, status }: { id: number; status: string }) => void;
  isLoading: boolean;
}

const statusConfig: Record<
  PropertyStatus,
  {
    label: string;
    variant: "default" | "secondary" | "warning" | "success" | "destructive";
    icon: React.ReactNode;
    actionClassName: string;
  }
> = {
  saved: {
    label: "Saved",
    variant: "secondary",
    icon: <Bookmark className="w-3 h-3" />,
    actionClassName:
      "hover:bg-slate-50 hover:border-slate-500 hover:text-slate-700",
  },
  contacted: {
    label: "Contacted",
    variant: "default",
    icon: <MessageCircle className="w-3 h-3" />,
    actionClassName:
      "hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700",
  },
  viewing_scheduled: {
    label: "Viewing Scheduled",
    variant: "warning",
    icon: <CalendarClock className="w-3 h-3" />,
    actionClassName:
      "hover:bg-amber-50 hover:border-amber-500 hover:text-amber-700",
  },
  viewed: {
    label: "Viewed",
    variant: "success",
    icon: <Check className="w-3 h-3" />,
    actionClassName:
      "hover:bg-indigo-50 hover:border-indigo-500 hover:text-indigo-700",
  },
  shortlisted: {
    label: "Shortlisted",
    variant: "success",
    icon: <Star className="w-3 h-3" />,
    actionClassName:
      "hover:bg-green-50 hover:border-green-500 hover:text-green-700",
  },
  rejected: {
    label: "Rejected",
    variant: "destructive",
    icon: <X className="w-3 h-3" />,
    actionClassName: "hover:bg-red-50 hover:border-red-500 hover:text-red-700",
  },
};

const statusActions = propertyStatus;

export default function PropertyCard({
  property,
  setSelectedPropertyId,
  setIsOpenDialog,
  handleUpdateStatus,
  isLoading = false,
}: PropertyCardProps) {
  const currentStatus = statusConfig[property.status];
  const availableStatusActions = statusActions.filter(
    (status) => status !== property.status,
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col py-0">
      {/* Image with Status Badge Overlay */}
      <div className="relative">
        <img
          src={property.image || "/images/img-not-found.png"}
          alt={property.property_name}
          className="aspect-video h-48 w-full object-cover bg-gray-300 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Status Badge Overlay */}
        <div className="absolute top-3 right-3">
          <Badge
            variant={currentStatus.variant}
            className="shadow-md flex items-center gap-1.5"
          >
            {currentStatus.icon}
            {currentStatus.label}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        {/* Property Name */}
        <CardTitle className="text-xl line-clamp-1">
          {property.property_name}
        </CardTitle>

        {/* Price - Prominent Display */}
        <div className="text-2xl font-bold text-primary mt-1">
          {formatPrice(property.rent_price)}
          <span className="text-sm font-normal text-muted-foreground ml-1">
            /month
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-4 flex flex-col flex-1">
        {/* Property Details */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 shrink-0 text-primary" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 shrink-0 text-primary" />
            <span>{property.property_type}</span>
          </div>

          {property.contact && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0 text-primary" />
              <span>{property.contact}</span>
            </div>
          )}
        </div>

        {/* Notes */}
        {property.notes && (
          <p className="text-sm text-muted-foreground line-clamp-2 pt-2 border-t">
            {property.notes}
          </p>
        )}

        {/* External Link */}
        <div className="pt-2">
          <Link
            href={property.url_link}
            target="_blank"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors group/link"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            <span className="truncate group-hover/link:underline">
              View Listing
            </span>
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t pt-4 mt-auto">
          {/* Status Action Buttons */}
          <div className="flex items-center justify-between gap-2 relative">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                Quick Actions:
              </p>

              <div className="flex flex-wrap gap-1.5 pr-10">
                {isLoading ? (
                  <>
                    <Skeleton className="h-7 w-20" />
                    <Skeleton className="h-7 w-20" />
                  </>
                ) : (
                  availableStatusActions.map((status) => {
                    const config = statusConfig[status];
                    return (
                      <Button
                        key={status}
                        size="sm"
                        variant="outline"
                        className={cn(
                          "h-7 text-xs gap-1.5 hover:scale-105 transition-transform",
                          config.actionClassName,
                        )}
                        onClick={() =>
                          handleUpdateStatus({ id: property.id, status })
                        }
                      >
                        {config.icon}
                        {config.label}
                      </Button>
                    );
                  })
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-destructive bg-red-50 hover:bg-red-100 hover:text-destructive absolute top-0 right-0 transition-colors"
              onClick={() => {
                setSelectedPropertyId(property.id);
                setIsOpenDialog(true);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
