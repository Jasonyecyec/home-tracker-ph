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
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

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
const statuses: PropertyStatus[] = [
  "To View",
  "Viewed-Pending",
  "Finalist",
  "Rejected",
  "Contract Signed",
];

export default function PropertyForm({ isOpen, onChange }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    property_type: "",
    rent_price: "",
    location: "",
    contact_info: "",
    notes: "",
    status: "To View" as PropertyStatus,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        className="min-w-4xl"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add a property listing</DialogTitle>
          <DialogDescription>
            Capture the basic info for the listing so you can compare it later
            and keep your house-hunting funnel organized.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Property Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Sunset Condo"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property_type">Property Type</Label>
              <Select
                value={formData.property_type}
                onValueChange={(value) =>
                  handleSelectChange("property_type", value)
                }
              >
                <SelectTrigger id="property_type">
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
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rent_price">Rent Price (PHP)</Label>
              <Input
                id="rent_price"
                name="rent_price"
                type="number"
                placeholder="0.00"
                value={formData.rent_price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g., Makati, Manila"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact_info">Contact Info</Label>
              <Input
                id="contact_info"
                name="contact_info"
                placeholder="Phone or agent name"
                value={formData.contact_info}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="status">
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
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Any additional notes about the property"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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
