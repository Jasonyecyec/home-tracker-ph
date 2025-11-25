"use client";

import { useState } from "react";
// import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyStatus } from "@/types/Property.type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { ClipboardPaste } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { PropertyFormSchema, propertySchema } from "@/schemas/property.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface PropertyFormProps {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
}

const propertyTypes = [
  "Condo",
  "Apartment",
  "House",
  "Townhouse",
  "Studio",
  "Other",
];
const statuses: PropertyStatus[] = ["Pending", "Reviewed", "Rejected"];

export default function PropertyForm({ isOpen, onChange }: PropertyFormProps) {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormSchema>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      status: "Pending",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: PropertyFormSchema) => {
    console.log("Form Data:", data);
    // e.preventDefault();
    // const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      //   const {
      //     data: { user },
      //   } = await supabase.auth.getUser();
      //   if (!user) throw new Error("User not authenticated");
      //   const { error: insertError } = await supabase.from("properties").insert([
      //     {
      //       user_id: user.id,
      //       name: formData.name,
      //       property_type: formData.property_type,
      //       rent_price: parseFloat(formData.rent_price),
      //       location: formData.location,
      //       contact_info: formData.contact_info,
      //       notes: formData.notes,
      //       status: formData.status,
      //     },
      //   ]);
      //   if (insertError) throw insertError;
      // onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent
        className="min-w-3xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add a property listing</DialogTitle>
          <DialogDescription>
            Capture the basic info for the listing so you can compare it later
            and keep your house-hunting funnel organized.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* URL Link */}
          <div className="space-y-2 relative">
            <Label htmlFor="url_link">URL Link</Label>
            <Input
              id="url_link"
              placeholder="e.g., Sunset Condo"
              className="h-12 text-blue-500"
              {...register("url_link")}
            />

            {errors.url_link && (
              <p className="text-xs text-destructive">
                {errors.url_link.message}
              </p>
            )}

            <Button
              size="icon"
              type="button"
              aria-label="Paste listing link"
              className="absolute top-7 right-2 "
              onClick={() => {
                navigator.clipboard.readText().then((text) => {
                  setValue("url_link", text);
                });
              }}
            >
              <ClipboardPaste />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="property_name">Property Name</Label>
              <Input
                id="property_name"
                placeholder="e.g., Sunset Condo"
                {...register("property_name")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="property_type">Property Type</Label>
              <Controller
                control={control}
                name="property_type"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="property_type" className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rent_price">Rent / Price (PHP)</Label>
              <Input
                id="rent_price"
                type="number"
                placeholder="0.00"
                {...register("rent_price")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location (City)</Label>
              <Input
                id="location"
                placeholder="e.g., Makati, Manila"
                {...register("location")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Info</Label>
              <Input
                id="contact"
                type="tel"
                placeholder="09xx xxx xxxx"
                {...register("contact")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="status" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              placeholder="Any additional notes about the property"
              rows={3}
              {...register("notes")}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {/* <div className="flex gap-2 justify-end"> */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">
              Save changes
            </Button>
          </DialogFooter>
          {/* </div>   */}
        </form>
      </DialogContent>
    </Dialog>
  );
}
