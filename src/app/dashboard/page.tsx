"use client";
import { useState, useEffect } from "react";
// import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import PropertyCard from "@/components/property-card";
// import PropertyForm from "@/components/property-form";
import { useState as useStateDebug } from "react";
import PropertyCard from "@/components/dashboard/property-card";
import PropertyForm from "@/components/properties/property-form";
import { Property } from "@/types/Property.type";

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [priceFilter, setPriceFilter] = useState<string>("");
  //   const supabase = createClient();

  const loadProperties = async () => {
    setIsLoading(true);
    try {
      //   const { data, error } = await supabase
      //     .from("properties")
      //     .select("*")
      //     .order("created_at", { ascending: false });
      //   if (error) throw error;
      //   setProperties(data || []);
    } catch (error) {
      console.error("Error loading properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handlePropertyDeleted = () => {
    loadProperties();
  };

  const handlePropertyAdded = () => {
    setShowForm(false);
    loadProperties();
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Property Search
          </h2>
          <p className="text-muted-foreground">
            Total properties: {properties.length}
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          {showForm ? "Cancel" : "+ Add Property"}
        </Button>
      </div>

      {/* {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Property</CardTitle>
          </CardHeader>
          <CardContent>
            <PropertyForm
              onSuccess={handlePropertyAdded}
              onCancel={() => setShowForm(false)}
            />
          </CardContent>
        </Card>
      )} */}

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

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="price" className="text-sm">
            Max Rent Price
          </Label>
          <Input
            id="price"
            type="number"
            placeholder="Enter max price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading properties...</p>
        </div>
      ) : filteredProperties.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            No properties found. Start by adding your first property.
          </p>
          <Button onClick={() => setShowForm(true)}>
            Add Your First Property
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onDeleted={handlePropertyDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}
