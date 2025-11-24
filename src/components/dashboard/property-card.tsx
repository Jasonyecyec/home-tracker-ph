"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { Property } from "@/types/Property.type";

interface PropertyCardProps {
  property: Property;
  onDeleted: () => void;
}

const statusColorMap: Record<Property["status"], string> = {
  "To View": "bg-blue-100 text-blue-800",
  "Viewed-Pending": "bg-yellow-100 text-yellow-800",
  Finalist: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
  "Contract Signed": "bg-purple-100 text-purple-800",
};

export default function PropertyCard({
  property,
  onDeleted,
}: PropertyCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  //   const supabase = createClient();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    setIsDeleting(true);
    try {
      //   const { error } = await supabase
      //     .from("properties")
      //     .delete()
      //     .eq("id", property.id);
      //   if (error) throw error;
      //   onDeleted();
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete property");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="hover:shadow-md transition">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg text-balance">
              {property.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {property.location}
            </p>
          </div>
          <span
            className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
              statusColorMap[property.status]
            }`}
          >
            {property.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <p className="text-sm">
            <span className="text-muted-foreground">Type:</span>{" "}
            <span className="font-medium">{property.property_type}</span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Rent:</span>{" "}
            <span className="font-medium">
              ₱{property.rent_price.toLocaleString()}
            </span>
          </p>
          {property.contact_info && (
            <p className="text-sm">
              <span className="text-muted-foreground">Contact:</span>{" "}
              <span className="font-medium">{property.contact_info}</span>
            </p>
          )}
        </div>
        {property.notes && (
          <p className="text-sm text-muted-foreground italic">
            {property.notes}
          </p>
        )}
        <div className="flex gap-2 pt-2">
          <Link href={`/dashboard/property/${property.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "..." : "Delete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
