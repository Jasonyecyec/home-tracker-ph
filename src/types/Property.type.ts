export interface Property {
  id: number;
  user_id: string;
  property_name: string;
  property_type: string;
  rent_price: number;
  location: string;
  contact_info?: string;
  notes?: string;
  status: PropertyStatus;
  created_at: string;
  updated_at: string;
  image: string;
  url_link: string;
  contact: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  created_at: string;
}

export type PropertyStatus = "pending" | "reviewed" | "rejected";
