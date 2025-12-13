import { NextResponse } from "next/server";

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Alice",
  },
];

export async function GET() {
  return NextResponse.json(mockUsers);
}
