"use client";
import { useState } from "react";
import { Property } from "@/types/Property.type";

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([]);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Dashboard</h2>
          <p className="text-muted-foreground">
            Total properties: {properties.length}
          </p>
        </div>
      </div>
    </div>
  );
}
