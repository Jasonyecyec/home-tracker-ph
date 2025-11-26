"use client";

import { useEffect, useState } from "react";
// import { createClient } from "@/lib/supabase/client";
//Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// Types
import { PropertyStatus } from "@/types/Property.type";

import { ClipboardPaste, Upload, X, Image as ImageIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { PropertyFormSchema, propertySchema } from "@/schemas/property.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

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

// Image Upload Component
function ImageUpload({
  value,
  onChange,
}: {
  value: File | string | null | undefined;
  onChange: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File | null) => {
    setError(null);

    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file (PNG, JPG, etc.)");
        return;
      }
      // Validate file size (max 1MB)
      if (file.size > 1 * 1024 * 1024) {
        setError("Image size must be less than 1MB");
        return;
      }

      // Revoke old URL
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const clearImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    onChange(null);
    setPreview(null);
    setError(null);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="space-y-2">
      {!preview ? (
        <label
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative border-2 border-dashed rounded-lg p-6
            transition-all duration-200 cursor-pointer
            hover:border-primary hover:bg-primary/5 block
            ${isDragging ? "border-primary bg-primary/10 scale-[1.02]" : "border-muted-foreground/25"}
          `}
        >
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="sr-only"
          />
          <div className="flex flex-col items-center justify-center text-center space-y-2 pointer-events-none">
            <div className="p-3 rounded-full bg-primary/10">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Drop image here or click to upload
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 1MB
              </p>
            </div>
          </div>
        </label>
      ) : (
        <div className="relative rounded-lg border border-border overflow-hidden bg-muted">
          <div className="relative h-40 w-full">
            <Image
              src={preview}
              alt="Property preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 p-1 cursor-pointer hover:bg-red-600 rounded-full bg-red-500  text-white transition-colors"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="p-2 bg-background/95 backdrop-blur">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground truncate flex-1">
                {value instanceof File ? value.name : "Image uploaded"}
              </p>
              <p className="text-xs text-muted-foreground">
                {value instanceof File
                  ? `${(value.size / 1024).toFixed(1)} KB`
                  : ""}
              </p>
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

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
      image: undefined,
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

              {errors.property_type && (
                <p className="text-xs text-destructive">
                  {errors.property_type.message}
                </p>
              )}
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
              {errors.rent_price && (
                <p className="text-xs text-destructive">
                  {errors.rent_price.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location (City)</Label>
              <Input
                id="location"
                placeholder="e.g., Makati, Manila"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-xs text-destructive">
                  {errors.location.message}
                </p>
              )}
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

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <textarea
                id="notes"
                placeholder="Any additional notes about the property"
                rows={3}
                {...register("notes")}
                className="w-full h-38 resize-none px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Property Image</Label>
              <Controller
                control={control}
                name="image"
                render={({ field: { onChange, value } }) => (
                  <ImageUpload value={value} onChange={onChange} />
                )}
              />
              {errors.image && (
                <p className="text-xs text-destructive">
                  {errors.image.message}
                </p>
              )}
            </div>
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
