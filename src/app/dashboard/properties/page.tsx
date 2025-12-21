"use client";
import PropertyForm from "@/components/properties/property-form";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Property() {
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null,
  );
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await fetch("/api/properties");

      if (!response.ok) toast.error("Failed to load properties");

      return response.json();
    },
  });

  const { mutateAsync: deleteProperty, isPending: isDeleting } = useMutation({
    mutationKey: ["properties"],
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/properties/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success(data.message || "Property deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete property");
    },
  });

  const hanndleDeleteProperty = async () => {
    if (!selectedPropertyId) return;
    await deleteProperty(selectedPropertyId);
    setIsOpenDialog(false);
  };

  if (isPending) return <div>Loading...</div>;

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
        <div
          key={property.id}
          className="mt-4 p-4 border rounded-md flex justify-between"
        >
          <div>
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
                {property.url_link}
              </Link>
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setSelectedPropertyId(property.id);
              setIsOpenDialog(true);
            }}
            className="text-destructive hover:bg-destructive/80 hover:text-white transition-colors"
          >
            <Trash2 />
          </Button>
        </div>
      ))}

      <AlertDialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              property and all associated data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={hanndleDeleteProperty}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
