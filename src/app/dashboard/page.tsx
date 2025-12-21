"use client";
import { useState } from "react";
import { Property } from "@/types/Property.type";

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [priceFilter, setPriceFilter] = useState<string>("");

  const statusCounts = {
    "To View": properties.filter((p) => p.status === "To View").length,
    "Viewed-Pending": properties.filter((p) => p.status === "Viewed-Pending")
      .length,
    Finalist: properties.filter((p) => p.status === "Finalist").length,
    Rejected: properties.filter((p) => p.status === "Rejected").length,
    "Contract Signed": properties.filter((p) => p.status === "Contract Signed")
      .length,
  };

  const filteredProperties = properties.filter((property) => {
    const statusMatch =
      statusFilter === "All" || property.status === statusFilter;
    const priceMatch =
      !priceFilter || property.rent_price <= parseFloat(priceFilter);
    return statusMatch && priceMatch;
  });

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">
            Total properties: {properties.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {(
          [
            "All",
            "To View",
            "Viewed-Pending",
            "Finalist",
            "Rejected",
            "Contract Signed",
          ] as const
        ).map((status) => (
          <button
            type="button"
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
              statusFilter === status
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-secondary"
            }`}
          >
            {status}
            {status !== "All" && (
              <span className="ml-2 text-xs">
                ({statusCounts[status as keyof typeof statusCounts]})
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
