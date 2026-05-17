// Components

import { CircleIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { propertyStatus } from "@/lib/constant";
import type { PropertyStatus } from "@/types/Property.type";

interface PropertyFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PropertyFilter({
  value,
  onChange,
}: PropertyFilterProps) {
  const iconColor: Record<PropertyStatus | "all", string> = {
    saved: "text-slate-500 fill-slate-500",
    contacted: "text-blue-500 fill-blue-500",
    viewing_scheduled: "text-amber-500 fill-amber-500",
    viewed: "text-indigo-500 fill-indigo-500",
    shortlisted: "text-green-500 fill-green-500",
    rejected: "text-red-500 fill-red-500",
    all: "text-gray-500 fill-gray-500",
  };

  const formatStatusLabel = (status: PropertyStatus) =>
    status.replaceAll("_", " ");

  return (
    <div className="flex justify-end items-center gap-3">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[150px] [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>

        <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:pr-8 [&_*[role=option]]:pl-2 [&_*[role=option]>span]:right-2 [&_*[role=option]>span]:left-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
          <SelectItem value="all">
            <span className="flex items-center gap-2">
              <CircleIcon className={`size-2 ${iconColor.all}`} />
              <span className="truncate capitalize">All</span>
            </span>
          </SelectItem>

          {propertyStatus.map((status) => (
            <SelectItem key={status} value={status}>
              <span className="flex items-center gap-2">
                <CircleIcon className={`size-2 ${iconColor[status]}`} />
                <span className="truncate capitalize">
                  {formatStatusLabel(status)}
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
