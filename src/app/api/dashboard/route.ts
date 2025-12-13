import { NextResponse } from "next/server";
import { Property } from "@/types/Property.type";

const mockProperties: Property[] = [
  {
    id: "prop_rise_makati",
    user_id: "user_jason",
    name: "The Rise Makati - 1BR",
    property_type: "Condo",
    rent_price: 42000,
    location: "San Antonio, Makati",
    contact_info: "Anne Reyes · 0917 000 0000",
    notes: "Corner unit facing amenities, newly turned over.",
    status: "To View",
    created_at: "2024-11-28T09:00:00.000Z",
    updated_at: "2024-11-30T12:15:00.000Z",
  },
  {
    id: "prop_solinea_cebu",
    user_id: "user_jason",
    name: "Solinea Tower 3 - Studio",
    property_type: "Condo",
    rent_price: 32000,
    location: "Cebu Business Park",
    contact_info: "Broker MJ · 0917 111 2222",
    notes: "Comes furnished with parking add-on.",
    status: "Viewed-Pending",
    created_at: "2024-11-12T07:30:00.000Z",
    updated_at: "2024-11-25T08:05:00.000Z",
  },
  {
    id: "prop_alabang_townhouse",
    user_id: "user_jason",
    name: "Alabang Townhouse - 3BR",
    property_type: "House",
    rent_price: 75000,
    location: "Ayala Alabang",
    contact_info: "Direct owner · 0917 555 1212",
    notes: "Needs repainting allowance, pets allowed.",
    status: "Finalist",
    created_at: "2024-10-05T05:10:00.000Z",
    updated_at: "2024-11-22T18:40:00.000Z",
  },
  {
    id: "prop_vertis_north",
    user_id: "user_jason",
    name: "Avida Towers Vita - 2BR",
    property_type: "Condo",
    rent_price: 38000,
    location: "Vertis North, QC",
    contact_info: "Leasing · leasing@avida.com",
    notes: "Rejected due to limited natural light.",
    status: "Rejected",
    created_at: "2024-09-15T02:45:00.000Z",
    updated_at: "2024-10-01T14:20:00.000Z",
  },
  {
    id: "prop_bgc_loft",
    user_id: "user_jason",
    name: "Two Serendra Loft",
    property_type: "Condo",
    rent_price: 95000,
    location: "BGC, Taguig",
    contact_info: "In-House Leasing · 0917 900 1234",
    notes: "Signed contract for 2-year lease, includes 1 parking slot.",
    status: "Contract Signed",
    created_at: "2024-08-02T11:20:00.000Z",
    updated_at: "2024-11-28T15:00:00.000Z",
  },
];

function buildSummary(properties: Property[]) {
  const statusCounts: Record<Property["status"], number> = {
    "To View": 0,
    "Viewed-Pending": 0,
    Finalist: 0,
    Rejected: 0,
    "Contract Signed": 0,
  };

  let totalRent = 0;

  for (const property of properties) {
    statusCounts[property.status] += 1;
    totalRent += property.rent_price;
  }

  const averageRent =
    properties.length > 0 ? Math.round(totalRent / properties.length) : 0;

  return {
    totalProperties: properties.length,
    averageRent,
    statusCounts,
  };
}

export async function GET() {
  const summary = buildSummary(mockProperties);

  return NextResponse.json({
    summary,
    properties: mockProperties,
  });
}
