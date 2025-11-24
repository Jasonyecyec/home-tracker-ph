"use client";
import PropertyForm from "@/components/properties/property-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Property() {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  return (
    <div className="p-5 border rounded-md">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Property List</h2>

        <Button onClick={() => setIsOpenForm(true)}>
          <Plus />
          Add Property
        </Button>
      </div>

      <PropertyForm isOpen={isOpenForm} onChange={setIsOpenForm} />
    </div>
  );
}
