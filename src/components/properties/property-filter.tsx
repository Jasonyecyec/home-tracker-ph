// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { propertyStatus } from "@/lib/constant";
import { CircleIcon } from "lucide-react";

interface PropertyFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function PropertyFilter({ value, onChange }: PropertyFilterProps) {
  const IconColor = {
    pending: "text-amber-500 fill-amber-500",
    reviewed: "text-green-500 fill-green-500",
    rejected: "text-red-500 fill-red-500",
    all: "text-gray-500 fill-gray-500",
  };

  return (
    <div className="flex justify-end items-center gap-3">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[150px] [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>

        <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:pr-8 [&_*[role=option]]:pl-2 [&_*[role=option]>span]:right-2 [&_*[role=option]>span]:left-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
          <SelectItem value="all">
            <span className="flex items-center gap-2">
              <CircleIcon className={`size-2 ${IconColor["all"]}`} />
              <span className="truncate capitalize">All</span>
            </span>
          </SelectItem>

          {propertyStatus.map((status, index) => (
            <SelectItem key={index} value={status}>
              <span className="flex items-center gap-2">
                <CircleIcon className={`size-2 ${IconColor[status]}`} />
                <span className="truncate capitalize">{status}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
