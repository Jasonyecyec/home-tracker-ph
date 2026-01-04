"use client";

import { useState } from "react";

// Components
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PropertyCard from "@/components/properties/property-card";
import PropertyForm from "@/components/properties/property-form";
import { Button } from "@/components/ui/button";
// Types
import { Property } from "@/types/Property.type";
// Externals
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function PropertyPage() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {data?.map((property: Property) => (
          <PropertyCard
            property={property}
            key={property.id}
            setSelectedPropertyId={setSelectedPropertyId}
            setIsOpenDialog={setIsOpenDialog}
          />
        ))}
      </div>

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
            <Button
              onClick={hanndleDeleteProperty}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
