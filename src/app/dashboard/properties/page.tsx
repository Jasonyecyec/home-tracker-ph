"use client";
import PropertyForm from "@/components/properties/property-form";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function Property() {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

  const { isPending, error, data } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await fetch("/api/properties");

      if (!response.ok) toast.error("Failed to load properties");

      return response.json();
    },
  });

  if (isPending) return <div>Loading...</div>;

  console.log("Properties data:", data);

  return (
    <div className="p-5 border rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Property List</h2>

        <Button onClick={() => setIsOpenForm(true)}>
          <Plus />
          Add Property
        </Button>
      </div>

      <PropertyForm isOpen={isOpenForm} onChange={setIsOpenForm} />

      {data?.map((property: any) => (
        <div key={property.id} className="mt-4 p-4 border rounded-md">
          <h3 className="text-xl font-semibold">{property.property_name}</h3>
          <p>Type: {property.property_type}</p>
          <p>Location: {property.location}</p>
          <p>Rent Price: {property.rent_price}</p>
          <p>Status: {property.status}</p>
          <p>
            URL Link:{" "}
            <Link
              href={property.url_link}
              target="_blank"
              className="text-blue-600 hover:text- hover:text-blue-700 transition-colors"
            >
              {" "}
              {property.url_link}
            </Link>
          </p>
        </div>
      ))}
    </div>
  );
}
