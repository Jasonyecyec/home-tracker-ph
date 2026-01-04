import Link from "next/link";
// Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Types
import { Property } from "@/types/Property.type";
// Externals
import {
  ChevronsUpDown,
  ExternalLink,
  Home,
  MapPin,
  PhilippinePeso,
  Phone,
  Trash2,
} from "lucide-react";
import { propertyStatus } from "@/lib/constant";

interface PropertyCardProps {
  property: Property;
  setSelectedPropertyId: (id: number) => void;
  setIsOpenDialog: (isOpen: boolean) => void;
  handleUpdateStatus: ({ id, status }: { id: number; status: string }) => void;
  isLoading: boolean;
}
export default function PropertyCard({
  property,
  setSelectedPropertyId,
  setIsOpenDialog,
  handleUpdateStatus,
  isLoading = false,
}: PropertyCardProps) {
  return (
    <Card className="max-w-md pt-0">
      <CardContent className="px-0">
        <img
          src={property.image || "/images/img-not-found.png"}
          alt={property.property_name}
          className="aspect-video h-60 rounded-t-xl object-cover bg-gray-300"
        />
      </CardContent>
      <CardHeader>
        <CardTitle>{property.property_name}</CardTitle>
        <CardDescription className="overflow-wrap space-y-1.5 min-w-0">
          <p>{property.notes}</p>

          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {property.location}
          </p>

          <p className="flex items-center gap-2">
            <Home className="w-4 h-4" /> {property.property_type}
          </p>

          <p className="flex items-center gap-2">
            <PhilippinePeso className="w-4 h-4" /> {property.rent_price}
          </p>

          {property.contact && (
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {property.contact}
            </p>
          )}

          <div className="mt-2 ">
            <p className="flex items-center gap-2 ">
              <ExternalLink className="w-4 h-4 shrink-0" />{" "}
              <Link
                href={property.url_link}
                target="_blank"
                className="text-blue-600 hover:text-blue-700 transition-colors block truncate min-w-0"
                title={property.url_link}
              >
                {property.url_link}
              </Link>
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardFooter className="gap-3 max-sm:flex-col max-sm:items-stretch mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="capitalize gap-2"
              disabled={isLoading}
            >
              {property.status}
              <ChevronsUpDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {propertyStatus.map((status) => {
                if (status === property.status) return null;
                return (
                  <DropdownMenuItem
                    key={status}
                    className="capitalize"
                    onClick={() =>
                      handleUpdateStatus({ id: property.id, status })
                    }
                  >
                    {status}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          onClick={() => {
            setSelectedPropertyId(property.id);
            setIsOpenDialog(true);
          }}
          className="text-destructive hover:bg-destructive/80 hover:text-white transition-colors"
        >
          <Trash2 />
        </Button>
      </CardFooter>
    </Card>
  );
}
