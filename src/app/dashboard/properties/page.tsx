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
import PropertyFilter from "@/components/properties/property-filter";
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
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const queryClient = useQueryClient();

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["properties", statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);

      const response = await fetch(`/api/properties?${params.toString()}`);

      if (!response.ok) toast.error("Failed to load properties");

      return response.json();
    },
  });

  const { mutateAsync: deleteProperty, isPending: isDeleting } = useMutation({
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

  const {
    mutateAsync: updatePropertyStatus,
    isPending: isUpdating,
    variables,
  } = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/properties/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    },
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["properties"] });

      // Snapshot previous value
      const previousProperties = queryClient.getQueryData(["properties"]);

      // Optimistically update
      queryClient.setQueryData(["properties"], (old: Property[]) =>
        old?.map((prop) =>
          prop.id === variables.id
            ? { ...prop, status: variables.status }
            : prop,
        ),
      );

      return { previousProperties };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success(data.message || "Property status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update property status");
    },
  });

  const hanndleDeleteProperty = async () => {
    if (!selectedPropertyId) return;
    await deleteProperty(selectedPropertyId);
    setIsOpenDialog(false);
  };

  if (isPending) return <div>Loading...</div>;

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-[calc(100vh-6rem)] p-5 border rounded-md space-y-5 overflow-y-scroll ">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Property List</h2>

        <Button onClick={() => setIsOpenForm(true)}>
          <Plus />
          Add Property
        </Button>
      </div>

      <PropertyFilter value={statusFilter} onChange={setStatusFilter} />

      <PropertyForm isOpen={isOpenForm} onChange={setIsOpenForm} />
      {data?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {data.map((property: Property) => (
            <PropertyCard
              property={property}
              key={property.id}
              setSelectedPropertyId={setSelectedPropertyId}
              setIsOpenDialog={setIsOpenDialog}
              handleUpdateStatus={updatePropertyStatus}
              isLoading={isUpdating && variables?.id === property.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full text-xl text-muted-foreground">
          <h1>No properties found.</h1>
        </div>
      )}

      {/* Delete Dialog */}
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
