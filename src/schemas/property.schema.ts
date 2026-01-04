import { z } from "zod";

export const propertySchema = z.object({
  url_link: z.url("Invalid URL format").min(1, "URL is required"),
  property_name: z.string().optional(),
  address: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  property_type: z.enum(
    ["Apartment", "House", "Condo", "Townhouse", "Studio", "Other"],
    { message: "Please select a property type" },
  ),
  rent_price: z.coerce
    .number<string | number>({ error: "Rent price must be a number" })
    .min(0, "Rent price cannot be negative"),
  status: z.enum(["pending", "reviewed", "rejected"]),
  notes: z.string().optional(),
  contact: z.string().optional(),
  image: z.file().optional().nullable(),
});

export type PropertyFormSchema = z.input<typeof propertySchema>;
