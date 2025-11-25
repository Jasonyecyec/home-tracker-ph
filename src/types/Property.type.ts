export interface Property {
  id: string;
  user_id: string;
  name: string;
  property_type: string;
  rent_price: number;
  location: string;
  contact_info?: string;
  notes?: string;
  status:
    | "To View"
    | "Viewed-Pending"
    | "Finalist"
    | "Rejected"
    | "Contract Signed";
  created_at: string;
  updated_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  created_at: string;
}

export type PropertyStatus = "Pending" | "Reviewed" | "Rejected";
