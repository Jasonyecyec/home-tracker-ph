import type { PropertyStatus } from "@/types/Property.type";

export const propertyTypes = [
  "Condo",
  "Apartment",
  "House",
  "Townhouse",
  "Studio",
  "Other",
];

export const propertyStatus: PropertyStatus[] = [
  "saved",
  "contacted",
  "viewing_scheduled",
  "viewed",
  "shortlisted",
  "rejected",
];
